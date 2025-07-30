# Dockerfile para aplicação FastAPI
FROM python:3.12-slim

WORKDIR /app

# Copia arquivos de dependências
COPY pyproject.toml pyproject.toml
RUN pip install .

# Copia o código da aplicação
COPY ./src ./src

# Expõe porta padrão do FastAPI
EXPOSE 8000

# Comando para iniciar o servidor
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
