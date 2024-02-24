const LocationModel = require('../db/models/Location');

class LocationDao {
    async init() {
        if (!this.Location) this.Location = await LocationModel();
    }

    async getAllLocations() {
        return await this.Location.findAll(
            { where: getBaseCondition() }
        );
    }

    async getLocation(id) {
        return await this.Location.findOne(
            { where: getBaseCondition(id) }
        );
    }

    async insertLocation(location) {
        return await this.Location.create(location);
    }

    async updateLocation(location) {
        await this.Location.update(
            location, 
            { where: getBaseCondition() }
        );
        return await this.Location.findOne(
            { where: getBaseCondition() }
        )
    }

    async deleteLocation(id) {
        const location = await this.Location.findOne(
            { where: getBaseCondition(id) }
        );
        if(location) return await location.destroy();
        return true;
    }
}

function getBaseCondition(id) {
    let condition = { active: true };
    if (id) condition.id = id;
    return condition;
}

module.exports = new LocationDao();