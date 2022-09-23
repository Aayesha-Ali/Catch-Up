import { firebase } from '../config'
 
export const queryUsersByEmail = (email) => new Promise((resolve, reject) => {
    if (email === '') {
        resolve([])
    }

    firebase.firestore().collection('users')
        .where('email', '>=', email)
        .where('email', '<=', email)
        .get()
        .then((querySnapshot) => {
            const users = []
            querySnapshot.forEach((doc) => {
                const {email, firstName, lastName} = doc.users();
                    users.push({
                        id: doc.id,
                        email,
                        firstName,
                        lastName,
                    });
            });
            resolve(users)
        })
        .catch(() => {
            reject()
        })
})
