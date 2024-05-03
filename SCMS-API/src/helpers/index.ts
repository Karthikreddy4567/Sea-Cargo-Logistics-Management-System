import crypto from 'crypto';

const SECRET = 'MELINDA-1204';

export const randomSeed = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: String, password: String) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
