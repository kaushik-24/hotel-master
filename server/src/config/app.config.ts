import express from "express";
import sanitizeHtml from "sanitize-html";
import middleware from "../middleware/index.middleware";

const app = express();

app.use((req, res, next) => {
    if (req.path === '/api/auth/register' || req.path === '/api/auth/login') {
        return next();
    }
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });
    res.locals.sanitizeHtml = sanitizeHtml;
    next();
});

middleware(app);

export default app;
