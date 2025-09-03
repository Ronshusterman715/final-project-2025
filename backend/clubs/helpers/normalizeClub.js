
const normalizeClub = async (rawClub, userId) => {
    return {
        ...rawClub,
        image: {
            url: rawClub.image_url || "https://source.unsplash.com/400x300/?community",
            alt: rawClub.image_alt || `${rawClub.title} club image`,
        },
        userId: rawClub.user_id || userId,
    }
};

module.exports = { normalizeClub };