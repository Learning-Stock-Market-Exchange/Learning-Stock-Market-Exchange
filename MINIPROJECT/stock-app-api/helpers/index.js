module.exports = {
    sqlConditionBuilder: function (params) {
        let condition = '';
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                condition = condition + (condition.length > 0 ? " and " : "") + key + "=" + `'${params[key]}'`
            }
        }
        return condition;
    },
    sqlProcedureParamBuilder: function (params) {
        let condition = '';
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                condition = condition + (condition.length > 0 ?  ",":"") + (["start_date","first_name","last_name","stock_symbol","symbol"].includes(key)  ? "'" + params[key] + "'" : params[key])
            }
        }
        return condition;
    },
    sqlConditionBuilderWithIn: function (key, params) {
        let condition = '';
        for (let index = 0; index < params.length; index++) {
            condition = condition + key + " in (" + `'${params[index][key]}')`
        }
        return condition;
    },
    valueBuilder: function (params) {
        let keys = [];
        let values = [];
        for (const key in params) {
            if (Object.hasOwnProperty.call(params, key)) {
                keys.push(key)
                values.push(params[key])
            }
        }
        let valuesQuery = "(" + keys.join(",") + ") values (" + values.map(value => `'${value}'`).join(",") + ")";
        return valuesQuery;
    }
}

