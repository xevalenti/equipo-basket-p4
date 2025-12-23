const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Inicializamos Firebase Admin
admin.initializeApp();

/**
 * Trigger que se ejecuta cuando se escribe algo en la base de datos
 * (crear, modificar o borrar)
 */
exports.notifyOnWrite = functions.database
  .ref("/mensajes/{mensajeId}")
  .onWrite(async (change, context) => {

    // Si el dato se ha borrado, no enviamos notificación
    if (!change.after.exists()) {
      return null;
    }

    const data = change.after.val();

    const payload = {
      notification: {
        title: "Nuevo mensaje en la base de datos",
        body: data.texto || "Se ha añadido o modificado un mensaje"
      }
    };

    // Enviamos la notificación a un topic
    return admin.messaging().sendToTopic("mensajes", payload);
  });

/**
 * Trigger que se ejecuta SOLO cuando se modifica un dato existente
 */
exports.notifyOnUpdate = functions.database
  .ref("/mensajes/{mensajeId}")
  .onUpdate(async (change, context) => {

    const before = change.before.val();
    const after = change.after.val();

    // Si el contenido no cambia, no hacemos nada
    if (before.texto === after.texto) {
      return null;
    }

    const payload = {
      notification: {
        title: "Mensaje actualizado",
        body: "El mensaje ha sido modificado"
      }
    };

    return admin.messaging().sendToTopic("mensajes", payload);
  });
