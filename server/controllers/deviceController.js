const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const { Device, DeviceInfo } = require('../models/models');

class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId} = req.body;
            const info = JSON.parse(req.body.info);
            const { img } = req.files;
            const filename = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', filename));
            const device = await Device.create({ name, price, brandId, typeId, img: filename });

            if (info) {
                info.forEach(async element => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    });
                });
            }
            console.log(device)
            return res.json(device);
        } catch (error) {
            console.log(error)
            //next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = Number(limit) || 9;
        console.log(limit)
        let offset = page * limit - limit;

        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
        }
        return res.json(devices);

    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'device_infos'}]
        })
        return res.json(device);
    }


}

module.exports = new DeviceController();