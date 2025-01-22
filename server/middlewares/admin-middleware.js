const adminMiddleware = async (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(403).send({ message: "Access denied, You are not an Admin" });
        };
        // If the user is an admin, proceed to the next middleware
        next();
    } catch (error) {
        res.status(401).send({ message: "Access denied by server" });
        next();
    }
};
module.exports = adminMiddleware;