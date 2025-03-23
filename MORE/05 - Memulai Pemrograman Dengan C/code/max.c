    /* File: max.c */
    /* Penulis : Bu Dengklek, email inge@bebras.or.id */
    /* Deskripsi : */
    /* Mencari nilai maksimum dari sebuah tabel yang berisi 10 nilai integer */
    #include<stdio.h>
    int main ()
    {/* Kamus : */
      int i;
      int Tab[10]= { 1, 50 , 6 , 200, 3, 100, 30, 8, 99, 100 };
      int max;
      /* Algoritma */
      max = Tab[0];
      for (i=1;i< 10; i++)  {
         if (Tab[i]>max) {
            max=Tab[i];
         }
      } 
      printf ("Nilai Max= %d", max);  return 0;
    }
