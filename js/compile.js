function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function() {
        if(this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        }
        else {
            console.log('Dom 不存在');
        }
    },
    nodeToFragment: function(el) {
        var fragment = document.createDocumentFragment();
        Array.prototype.slice.call(el.childNodes).forEach(function(node) {
            fragment.appendChild(node);
        });

        return fragment;
    },
    compileElement: function(el) {
        var childNodes = el.childNodes;
        var self = this;

        Array.prototype.slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;

            if(self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }

            if(node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);

        new Watcher(this.vm, exp, function(value) {
            self.updateText(node, value);
        });
    },
    updateText: function(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    isTextNode: function(node) {
        return node.nodeType === 3;
    }
}
