# **Sistema de Agilización de Pedidos FMAT (SAP)**<br>

## **Integrantes y roles**

<hr>

**Scrum Master**
* **Pacab Canul Rodrigo Joaquín** - [@iKinoo](https://github.com/iKinoo "@iKinoo")

 **Product Owner**
 * **Canché May Marco Santiago** - [@MarcoSIIIU](hhttps://github.com/MarcoSIIIU "@MarcoSIIIU")

**Development Team**
* **Sánchez Peraza Gabriel** - [@CebollaRodriguez](https://github.com/CebollaRodriguez "@CebollaRodriguez")
* **Díaz Gómez Wilbert** - [@Wilbert](https://github.com/Enrique325 "@Wilbert") 
* **Góngora Tun Jaqueline** - [@jaquelinegt](https://github.com/jaquelinegt "@jaquelinegt")
<hr>


## **Problemática** 
[**Video de presentación del proyecto**](https://youtu.be/HyCusK-BJfA)

 Ineficiencia de tiempo y administración en el proceso de pedidos de alimentos de la Cafetería de la Facultad de Matemáticas (FMAT).

## **Producto** 
Sistema de Administración de Pedidos.

## **Objetivo**
 Agilizar el proceso de los pedidos en la cafetería de FMAT a través de un sistema que permita las órdenes sin necesidad de estar físicamente presencial en la cafetería; y al mismo tiempo concentre el proceso de los pedidos de usuarios consumidores tanto físicos como no físicos.

## **Usuarios**
**Usuario cafetería.** Es el usuario que atiende y confirma (ver requerimiento F3) los pedidos de los usuarios consumidores físicos, y no físicos.

**Usuario Consumidor No físico.** Es el usuario que realiza pedidos a través del sistema. No es necesario que esté físicamente en la cafetería para ello.

**Usuario Consumidor Físico.** Es el usuario que no realiza pedidos a través del sistema. Es necesario que esté físicamente presente en la cafetería para realizar pedidos.

[Video de la segunda entrega](https://www.youtube.com/watch?v=Zcaey8lxAGE)

## **Innovación/creatividad**

La implementación de un sistema de pedidos en la facultad de matemáticas, el cual incluye simplicidad en su uso, estará al alcance de todos, permite la comunicación entre los usuario cafetería y usuario consumidor no físico, así como la gestión del proceso administrativo de los pedidos en la cafetería. 

## **Evolución del Producto**

-Se refinaron los requerimientos ya que estaban hechos para una plataforma especifica y se modificaron para que sea adaptable a varios sistemas. <br>
-Se modificaron las tablas de especificaciones. 
-Se redefinieron los usuarios.<br>
-Se establecieron nombres específicos para cada tipo de usuario.<br>
-Se realizo el modelo de baja fidelidad. Después avanzamos con el diseño media fidelidad, el cual fue utilizado para obtener retroalimentación por parte de los usuarios.<br>
-Se realizo la demo del Bot.<br>

## **Evolución de requerimientos**

-Se tomó en cuenta la opinión de la administradora de la cafetería para redefinir los requerimientos con base en sus necesidades.<br>
-Se juntaron aquellos requerimientos que estaban englobados por otros mayores, por lo que terminamos con 2 requerimientos funcionales. De igual manera, los requerimientos no funcionales se modificaron según los comentarios del maestro y los del usuario cafetería, debido a que algunos de estos no eran necesarios para el funcionamiento adecuado del sistema.

## **Refinación de artefactos**

### **Requerimientos**

Los siguientes requerimientos presentados tienen un identificador, cuya nomenclatura es entendida por *RF#*, “Funcionales” y número; y *RNF#*, “No Funcionales” y número.

### **Priorización de requerimientos**
<br>

Para la priorización de requerimientos se emplea la metodología MuSCoW: <br>

Must Have. Son características o funciones no negociables que, sin ellos, el sistema sería inútil<br>
Should Have. Son características o funciones que agregan valor al producto, pero que no son vitales.<br>
Could Have. Son características o funciones que sería bueno tener, pero que tienen poco impacto en el valor del producto.<br>
Won’t Have. Son características o funciones que no son prioridad, y que probablemente no se implementen en el tiempo de entrega especificado.

### **Requerimientos generales**
<br>

|          | Requerimmientos Funcionales | Prioridad   |
|----------|-----------------------------|-------------|
| RF1      | El sistema permitirá al usuario cafetería publicar un menú rotativo, es decir, el que cambiará conforme al día; y uno fijo, aquel que no cambiará durante el día.| Must Have |
| RF2      |El usuario consumidor no físico podrá hacer pedidos de alimentos a través del sistema, seleccionando los aperitivos que desee, podrá editar su selección, eliminar, u cancelar el pedido.| Must Have |

<br>

|          | Requerimmientos No Funcionales | Prioridad   |
|----------|--------------------------------|-------------|
| RF1      |El límite de los pedidos dependerá del inventario disponible y la capacidad del usuario cafetería.| Must Have |
| RF2      |El servicio estará disponible durante los horarios de 9:30 am a 1 pm | Must Have |
| RNF3    |Se proporcionará un aviso de privacidad de los datos.| Could Have |
| RNF4      |El sistema deberá procesar los pedidos respetando el orden de llegada, independientemente si sea de usuarios consumidores físicos o no físicos.| Must Have |
| RNF5    |El sistema será capaz de recopilar la información sobre los pedidos provenientes de usuarios no físicos.| Should Have |

### **Especificación de requerimientos**

|RF1       | Publicar menú                  |
|----------|--------------------------------|
|Versión   |2.0 (28/10/2022)                |
|Dependencias|No aplica |
|Precondición|El usuario cafetería tendrá la lista de alimentos del menú que se desea publicar. |
|Descripción|El sistema permitirá al usuario cafetería publicar los menús (rotativo, fijo, completo)|

|<h4>Secuencia normal<h4>|<h4>Paso<h4>|<h4>Acción<h4>|
|----------------|----|------|
|                |1.  |El usuario cafetería ingresará al sistema|
|                |2.  |El usuario cafetería ingresará el menú que desea publicar|
|                |3.  |El usuario cafetería publicará el menú|

|<h4>Postcondición<h4>|<h4>El menú deberá estar visible para los usuarios consumidores (físicos y no físicos)<h4>|
|-------------|----------------------------------------------------|
|Excepciones  |El menú no se publicará en caso de no laburo|
|Comentarios  |El usuario cafetería es el encargado de realizar la publicación de los menús.|

<br>
<br>

|RF2       | Hacer pedidos                  |
|----------|--------------------------------|
|Versión   |2.0 (4/10/2022)                |
|Dependencias|No aplica |
|Precondición|El usuario consumidor no físico deberá tener conocimiento al menos del menú completo. |
|Descripción|El usuario consumidor no físico podrá hacer pedidos de alimentos a través del sistema, seleccionando los aperitivos que desee, podrá editar su selección, eliminar, u cancelar el pedido.|

|<h4>Secuencia normal<h4>|<h4>Paso<h4>|<h4>Acción<h4>|
|----------------|----|------|
|                |1.  |El usuario consumidor no físico entrará al sistema e iniciará la interacción con este.|
|                |2.  |El sistema responderá con la representación de la lista del menú fijo|
|                |3.  |El usuario consumidor no físico seleccionará los aperitivos que desee.|
|                |3.1  |Si el usuario consumidor no fijo se equivoca o cambia de opinión, podrá editar su selección, posteriormente confirmará la acción para editarlos. |
|                |3.2  |Si el usuario consumidor no fijo decide cancelar toda orden, podrá hacerlo|
|                |4.  |El usuario consumidor no fijo confirmará que está listo para ordenar.|
|                |5.  |El sistema notificará al usuario cafetería del nuevo pedido.|
|                |6.  |El usuario consumidor no fijo deberá esperar la confirmación del usuario cafetería|
|                |7.  |El usuario cafetería confirmará el pedido y este se añadirá a la cola.|
|                |8.  |El usuario cafetería notificará que el pedido ya está listo al usuario consumidor no fijo|

|<h4>Postcondición<h4>|<h4>El usuario consumidor no fijo deberá ir a recoger su pedido.<h4>|
|-------------|----------------------------------------------------|
|Excepciones  |El menú no se publicará en caso de no laburo|
|Comentarios  |El usuario cafetería es el encargado de realizar la publicación de los menús.|

