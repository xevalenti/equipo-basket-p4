import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

interface Player {
  name: string;
  lastName: string;
  teams: string;
}

export const notifyPlayerCreated = functions.firestore
  .document("players/{playerId}")
  .onCreate(async (snap, context) => {
    const player = snap.data() as Player;
    if (!player) return;

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: "Nuevo jugador agregado",
        body: `${player.name} ${player.lastName} se ha agregado al equipo ${player.teams}`,
      },
    };

    await admin.messaging().sendToTopic("general", payload);
  });

export const notifyPlayerUpdated = functions.firestore
  .document("players/{playerId}")
  .onUpdate(async (change, context) => {
    const player = change.after.data() as Player;
    if (!player) return;

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: "Jugador actualizado",
        body: `${player.name} ${player.lastName} fue actualizado`,
      },
    };

    await admin.messaging().sendToTopic("general", payload);
  });
