from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message

app = Flask(__name__)

# Configuración de correo
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'matiasretamalescarrera@gmail.com'
app.config['MAIL_PASSWORD'] = 'kcfs byof dkes kusu'
app.config['MAIL_DEFAULT_SENDER'] = 'matiasretamalescarrera@gmail.com'

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_order', methods=['POST'])
def send_order():
    nombre = request.form.get('nombre')
    email = request.form.get('email')
    telefono = request.form.get('telefono')
    comentarios = request.form.get('comentarios')
    carrito = request.form.get('carrito')  # Obtener datos del carrito

    # Crear el mensaje
    msg = Message('Nuevo Pedido de El Perro Comilon', recipients=['matiasretamalescarrera@gmail.com'])
    msg.body = f"""
    Nombre: {nombre}
    Correo: {email}
    Teléfono: {telefono}
    Comentarios: {comentarios}
    
    Carrito de Compras: {carrito}
    """
    
    try:
        # Enviar el correo
        mail.send(msg)
        print("Correo enviado exitosamente.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
