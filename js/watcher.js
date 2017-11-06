function Watcher(vm, exp, vb) {
    this.vm = vm;
    this.exp = exp;
    this.vb = vb;
    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if(value !== oldValue) {
            this.value = value;
            this.vb.call(this.vm, value, oldValue);
        }
    },
    get: function() {
        Dep.target = this;
        var value = this.vm.data[this.exp];
        Dep.target = null;
        return value;
    }
}
