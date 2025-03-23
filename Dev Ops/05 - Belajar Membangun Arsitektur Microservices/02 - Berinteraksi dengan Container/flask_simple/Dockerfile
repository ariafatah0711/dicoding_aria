FROM python:3.8

WORKDIR /app
COPY . .

RUN pip install -r req.txt
EXPOSE 8080
CMD ["python", "app.py"]