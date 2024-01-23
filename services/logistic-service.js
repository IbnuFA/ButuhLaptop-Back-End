import axios from "axios"

export const RequestMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "OPTION"

const rajaOngkirInstance = async (method, url, body) => {
    const options = {
        url: process.env.RAJAONGKIR_URL + url,
        method,
        headers: {
            key: process.env.RAJAONGKIR_APIKEY
        },
        body
    }
    // options.body = body;
    return axios.request(options)
}

export const getProvinceById = async (id) => {
    try {
        const res = await rajaOngkirInstance("GET", "/province?id="+id)
        return res.data.rajaongkir?.results?.province;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getProvinces = async (id) => {
    try {
        const res = await rajaOngkirInstance("GET", "/province")
        return res.data.rajaongkir?.results;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getCityById = async (id) => {
    try {
        const res = await rajaOngkirInstance("GET", "/city?id="+id)
        console.log("ct", res.data)
        return res.data.rajaongkir?.results?.city_name;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getCities = async (provinceId = null) => {
    try {
        let path = '/city'

        if (provinceId) path += `?province=${provinceId}`

        const res = await rajaOngkirInstance("GET",  path)
        return res.data.rajaongkir?.results;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getShippingCost = async (city_id, weight) => {
    try {
        console.log(city_id, weight)
        const res = await axios.post(process.env.RAJAONGKIR_URL + "/cost", {
            origin: process.env.SHOP_CITY_ID,
            destination: city_id,
            weight,
            courier: "jne"
        }, {
            headers: {
                key: process.env.RAJAONGKIR_APIKEY
            }
        })
        const availCouriers = res.data.rajaongkir.results
        const options = availCouriers.map((c) => {
            console.log(c)
            return {
                provider: c.code,
                provider_name: c.name,
                // services: c.costs[0]
                services: c.costs.map((s) => {
                    return {
                        name: s.service,
                        cost: s.cost[0].value,
                        etd: s.cost[0].etd
                    }
                })
            }
        })
        return options[0]
    } catch (error) {
        console.error(error)
    }
}