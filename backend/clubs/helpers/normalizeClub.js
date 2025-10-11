
const normalizeClub = (rawClub, userId) => {
    return {
        ...rawClub,
        image: {
            //TODO: change default image when decide which club
            url: rawClub.image.url || "/public/chatgpt-general-club-Image.png",
            alt: rawClub.image.alt || `${rawClub.name} club image`,
        },
        userId: rawClub.user_id || userId,
    }
};

module.exports = { normalizeClub };