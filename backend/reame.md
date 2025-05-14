## ✅ Requirements

Before running, make sure you have:

* **Python 3.8+**
* **PostgreSQL** installed and running
* **virtualenv** (optional, but recommended)

---

## 🧱 1. Folder Structure (recap)

Project should look like:

```
supermarket/
├── manage.py
├── supermarket/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── checkout/
│   ├── models/
│   ├── services/
│   ├── views/
│   └── urls.py
```

---

## 🧰 2. Create and activate a virtual environment

Here python3 is used

```bash
python -m venv env
source env/bin/activate  # on Windows use `.\env\Scripts\Activate.ps1`
```

---

## 📦 3. Install dependencies

Install `requirements.txt`

```bash
pip install -r requirements.txt
```

---

## 🛠️ 4. Configure PostgreSQL (this step is only required for dev, for production user and password will be different and will be run by DBA after approval)

        1. Make sure PostgreSQL is running.
        2. Create a database:

        ```sql
        CREATE DATABASE supermarket_db;
        CREATE USER supermarket_user WITH PASSWORD 'supersecret';
        GRANT ALL PRIVILEGES ON DATABASE supermarket_db TO postgres;
        GRANT USAGE ON SCHEMA public TO postgres;
        GRANT CREATE ON SCHEMA public TO postgres;

        ```

        3. Update your `supermarket/settings.py`:

        ```python
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': 'supermarket_db',
                'USER': 'postgres',
                'PASSWORD': 'postgres',
                'HOST': 'localhost',
                'PORT': '5432',
            }
        }
        ```

## 🧱 5. Register the app in `supermarket/settings.py`

Add `'checkout',` to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    ...
    'checkout',
]
```

---

## 🔃 6. Apply migrations

```bash
python manage.py makemigrations checkout
python manage.py migrate
```

---

## 🚀 7. Run the development server

```bash
python manage.py runserver
```

Visit:
[http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🌐 8. Wire up your routes

In `checkout/urls.py`:

```python
from django.urls import path
from checkout.views.cart_views import create_cart, add_to_cart, get_total

urlpatterns = [
    path('create-cart/', create_cart),
    path('add-to-cart/', add_to_cart),
    path('get-total/', get_total),
]
```

In `supermarket/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('checkout/', include('checkout.urls')),
]
```

---

## 📬 9. Test API using `curl` or Postman

### ✅ Create a cart:

```bash
curl -X POST http://localhost:8000/checkout/create-cart/
```

Response:

```json
{"cart_id": 1}
```
### Defaultly add some product to cart:
INSERT INTO checkout_product (name, code, price) VALUES 
('Product A', 'A', 50),
('Product B', 'B', 30),
('Product C', 'C', 20),
('Product D', 'D', 15);

INSERT INTO checkout_discount (product_id, quantity, discount_price)
VALUES (1, 3, 130);

INSERT INTO checkout_discount (product_id, quantity, discount_price)
VALUES (2, 2, 45);

### ✅ Add product to cart:

Make sure you've added some products in the database (via admin or shell):

```bash
curl -X POST http://localhost:8000/checkout/add-to-cart/ \
    -H "Content-Type: application/json" \
    -d '{"cart_id": 1, "product_code": "A", "quantity": 3}'
```

### ✅ Get total:

```bash
curl -X POST http://localhost:8000/checkout/get-total/ \
    -H "Content-Type: application/json" \
    -d '{"cart_id": 1}'
```

---

## 🧪 Optional: Use Django Shell for Setup

```bash
python manage.py shell
```

```python
from checkout.models.product import Product
from checkout.models.cart import Discount

Product.objects.create(name='Product A', code='A', price=50)
Discount.objects.create(product_id=1, quantity=3, discount_price=130)
```

---

## ✅ Summary

| Step               | Description                      |
| ------------------ | -------------------------------- |
| `venv`             | Isolates Python dependencies     |
| `requirements.txt` | Tracks dependencies              |
| `PostgreSQL`       | Production-ready database        |
| `checkout/`        | Clean architecture Django app    |
| `urls.py`          | Makes endpoints accessible       |
| `services/`        | Contains reusable checkout logic |

---