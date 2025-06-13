import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("root")
DB_PASSWORD = os.getenv("flower#12")
DB_HOST = os.getenv("localhost")
DB_NAME = os.getenv("fault_db")

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:flower#12@localhost/fault_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()