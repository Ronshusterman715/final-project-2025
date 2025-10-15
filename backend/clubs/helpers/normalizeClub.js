
const normalizeClub = (rawClub, userId) => {
    return {
        ...rawClub,
        image: {
            url: rawClub.image.url || "/images/chatgpt-general-club-Image.png",
            alt: rawClub.image.alt || `${rawClub.name} club image`,
        },
        userId: rawClub.user_id || userId,
    }
};

module.exports = { normalizeClub };