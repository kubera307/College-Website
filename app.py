from flask import Flask, render_template, request, redirect, flash, jsonify
import sqlite3
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Needed for flash messages

DATABASE = "college.db"

# -----------------------------
# Create Database & Table
# -----------------------------
def create_table():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()

# -----------------------------
# Home Page
# -----------------------------
@app.route("/")
def home():
    return render_template("index.html")

# -----------------------------
# Save Contact Form
# -----------------------------
@app.route("/contact", methods=["POST"])
def contact():
    if request.is_json:
        data = request.get_json(silent=True) or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip()
        phone = (data.get("phone") or "").strip()
        message = (data.get("message") or "").strip()

        if not name or not email or not message:
            return jsonify({"error": "Please fill in all required fields."}), 400

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO contacts(name,email,phone,message)
            VALUES(?,?,?,?)
        """, (name, email, phone, message))
        conn.commit()
        conn.close()

        return jsonify({"message": "Your enquiry has been submitted successfully!"})

    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()
    message = request.form.get("message", "").strip()

    if not name or not email or not message:
        flash("Please fill in all required fields.")
        return redirect("/")

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO contacts(name,email,phone,message)
        VALUES(?,?,?,?)
    """, (name, email, phone, message))
    conn.commit()
    conn.close()

    flash("Your enquiry has been submitted successfully!")
    return redirect("/")

# -----------------------------
# View All Enquiries
# -----------------------------
@app.route("/admin")
def admin():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM contacts ORDER BY id DESC")
    enquiries = cursor.fetchall()
    conn.close()
    return render_template("admin.html", enquiries=enquiries)

# -----------------------------
# Delete Enquiry
# -----------------------------
@app.route("/delete/<int:id>")
def delete(id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM contacts WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return redirect("/admin")

# -----------------------------
# Run Application
# -----------------------------
if __name__ == "__main__":
    create_table()
    print("Database Location:", os.path.abspath(DATABASE))
    app.run(debug=True)
