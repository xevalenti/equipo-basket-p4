// HTTP v2
import { onRequest } from 'firebase-functions/v2/https';

// Database v1 (IMPORTANTE)
import * as functions from 'firebase-functions/v1';

// Tipos v1
import { Change, EventContext } from 'firebase-functions/v1';

// Admin + logger
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

admin.initializeApp();

/**
 * HTTP function
 */
export const helloWorld = onRequest((req, res) => {
    logger.info('Function triggered');
    res.send('Hello from Firebase!');
});

/**
 * Trigger onWrite
 */
export const notifyOnWrite = functions.database
    .ref('/messages/{messageId}')
    .onWrite(
        async (
            change: Change<functions.database.DataSnapshot>,
            context: EventContext
        ) => {
            const data = change.after.val();

            if (!data) return;

            const message = {
                notification: {
                    title: 'Nuevo mensaje',
                    body: data.text ?? 'Cambio en la base de datos',
                },
                topic: 'allUsers',
            };

            await admin.messaging().send(message);
            logger.info('Notificación enviada (onWrite)');
        }
    );

/**
 * Trigger onUpdate
 */
export const notifyOnUpdate = functions.database
    .ref('/messages/{messageId}')
    .onUpdate(
        async (
            change: Change<functions.database.DataSnapshot>,
            context: EventContext
        ) => {
            const before = change.before.val();
            const after = change.after.val();

            if (before?.text === after?.text) return;

            const message = {
                notification: {
                    title: 'Mensaje actualizado',
                    body: `Antes: ${before?.text} → Ahora: ${after?.text}`,
                },
                topic: 'allUsers',
            };

            await admin.messaging().send(message);
            logger.info('Notificación enviada (onUpdate)');
        }
    );
