/**
 * Created by ference on 2016/12/13.
 */

module.exports = function() {
    return new Filter();
};

module.exports.disabled = false; //是否禁用,可选

class Filter
{
     before (msg, session, next) {
        if (msg.content.indexOf('fuck') !== -1) {
            session.__abuse__ = true;
            msg.content = msg.content.replace('fuck', '****');
        }
        next();
    }

    after (err, msg, session, resp, next) {
        if (session.__abuse__) {
            var user_info = session.uid.split('*');
            console.log('abuse:' + user_info[0] + " at room " + user_info[1]);
        }
        next(err);
    }
}

