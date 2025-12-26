# 02 - latihan data loading
import pandas as pd

test = pd.read_csv("test.csv") # load data dari file test.csv
test.head() # menampilkan 5 baris pertama data

train = pd.read_csv("train.csv")
train.head()

# 03 - latihan data cleaning
train.info() # melihat informasi data
train.describe(include="all") # statistik deskriptif
total_missing = train.isnull().sum()
missing_values = total_missing[total_missing > 0]

# Mengatasi Missing Value
less = missing_values[missing_values < 1000].index
over = missing_values[missing_values >= 1000].index

# Mengisi nilai hilang pada kolom numerik dengan median
numeric_features = train[less].select_dtypes(include=['number']).columns
train[numeric_features] = train[numeric_features].fillna(train[numeric_features].median())

# Mengisi nilai hilang pada kolom kategori dengan mode
kategorical_features = train[less].select_dtypes(include=['object']).columns
for column in kategorical_features:
    train[column] = train[column].fillna(train[column].mode()[0])

# Menghapus kolom dengan terlalu banyak nilai yang hilang
df = train.drop(columns=over)

# Cek kembali missing value
missing_values = df.isnull().sum()
missing_values[missing_values > 0]

# 04 - Mengatasi Outliers
import seaborn as sns
import matplotlib.pyplot as plt

# for feature in numeric_features:
#     plt.figure(figsize=(10, 6))
#     sns.boxplot(x=df[feature])
#     plt.title(f'Box Plot of {feature}')
#     plt.show()

# Contoh sederhana untuk mengidentifikasi outliers menggunakan IQR
Q1 = df[numeric_features].quantile(0.25)
Q3 = df[numeric_features].quantile(0.75)
IQR = Q3 - Q1

# Filter dataframe untuk hanya menyimpan baris yang tidak mengandung outliers pada kolom numerik
condition = ~((df[numeric_features] < (Q1 - 1.5 * IQR)) | (df[numeric_features] > (Q3 + 1.5 * IQR))).any(axis=1)
df_filtered_numeric = df.loc[condition, numeric_features]

# Menggabungkan kembali dengan kolom kategorikal
categorical_features = df.select_dtypes(include=['object']).columns
df = pd.concat([df_filtered_numeric, df.loc[condition, categorical_features]], axis=1)

# for feature in numeric_features:
#     plt.figure(figsize=(10, 6))
#     sns.boxplot(x=df[feature])
#     plt.title(f'Box Plot of {feature}')
#     plt.show()

# 05 - normalisasi data
from sklearn.preprocessing import StandardScaler

# Standardisasi fitur numerik
scaler = StandardScaler()
df[numeric_features] = scaler.fit_transform(df[numeric_features])

# # Histogram untuk semua kolom numerik sebelum dan sesudah standardisasi
# for col in numeric_features:
#     plt.figure(figsize=(12, 5))
#     plt.subplot(1, 2, 1)
#     sns.histplot(train[col], kde=True)
#     plt.title(f"Histogram Sebelum Standardisasi: {col}")
#     plt.subplot(1, 2, 2)
#     sns.histplot(df[col], kde=True)
#     plt.title(f"Histogram Setelah Standardisasi: {col}")
#     plt.tight_layout()
#     plt.show()

# 06 - mengatasi data duplikat
# Mengidentifikasi baris duplikat
duplicates = df.duplicated()

print("Baris duplikat:")
print(df[duplicates])

# Menghapus baris duplikat
df = df.drop_duplicates()

print("DataFrame setelah menghapus duplikat:")
print(df)

# 07 - encoding data kategori
# sebelum kita melakukan encoding, silakan perhatikan data kategorikal yang ada pada dataset
category_features = df.select_dtypes(include=['object']).columns

# Pastikan tidak ada missing value di kolom kategorikal
# (LabelEncoder tidak bisa handle NaN)
df[category_features] = df[category_features].fillna('missing')

# One-hot encoding
df_one_hot = pd.get_dummies(df, columns=category_features)

from sklearn.preprocessing import LabelEncoder

# Inisialisasi LabelEncoder
df_lencoder = df.copy()
label_encoder = LabelEncoder()
for col in category_features:
    df_lencoder[col] = label_encoder.fit_transform(df_lencoder[col])

# Menampilkan hasil
print(df_one_hot.head())
print(df_lencoder.head())
