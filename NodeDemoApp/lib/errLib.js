
module.exports = {

    SUCCESS_CODE: '00100000',

    ERR_INVALID_PARAMS: '00199999',
    ERR_QUERY_ERR: '10000001',
    ERR_INSERT_FAILURE: '10000002',
    ERR_UPDATE_FAILURE: '10000003',

    getErr: function (errCode, errInfo) {

        var msg;

        switch (errCode) {
            case this.ERR_INVALID_PARAMS:
                msg = '参数不能为空';
                break;
            case this.ERR_QUERY_ERR:
                msg = '查询失败，不存在的用户';
                break;
            case this.ERR_INSERT_FAILURE:
                msg = '插入失败，用户已存在';
                break;
            case this.ERR_UPDATE_FAILURE:
                msg = '更新失败，用户不存在';
                break;

            default:
                if (errInfo) {
                    msg = errInfo;
                } else {
                    msg = '新的未知错误';
                }
                break;
        }

        var err = new Error(msg);
        err.code = errCode;
        err.msg = err.message;

        return err;
    }

};