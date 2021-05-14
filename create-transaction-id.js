var TransactionBenny;
// var d = "https://608934a68c8043001757e3d3.mockapi.io/en/v1/";
var d = "192.168.1.133:3002/en/v1/lp";

!(function(l) {

    l.createTransactionSaveToCookie = function(a,b) {
        var p = a;
        if (!p) {
            var url = new URL(window.location.href);
            var p = url.searchParams.get("timeline_id");
            if (!p) return;
        }
        fetch(d + "?kpi=" + p)
            .then((r) => r.json())
            .then((r) => {
                if (typeof b === "function") {
                    b(r.data || null);
                } else if (r) {
                    l.cc(r.data);
                    b(r.data || null);
                }
                console.log("DEBUG::: ",r);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    l.cc = function (p) {
        var now = new Date();
        var time = now.getTime();
        var expire = time + 24 * 3600 * 1000;
        now.setTime(expire);
        document.cookie = `beneymall_transaction_id="${p};expires=${now.toUTCString()};path=/`;
    }
})(TransactionBenny || (TransactionBenny = {}));