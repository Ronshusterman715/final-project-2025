
const normalizeClub = async (rawClub, userId) => {
    return {
        ...rawClub,
        image: {
            //TODO: change default image when decide which club
            url: rawClub.image_url || "/images/ChatGPT-general-club-Image.png",
            alt: rawClub.image_alt || `${rawClub.title} club image`,
        },
        userId: rawClub.user_id || userId,
    }
};

module.exports = { normalizeClub };