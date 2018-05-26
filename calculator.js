var calculatorvm = new Vue({
    el: '#calculator',

    //track displayed vale and operator that equal uses
    data: {
        displayValue: '0',
        currentOp: '',
    },
    methods: {
        clear() {
            this.displayValue = '0';
            this.leftValue = '0';
            this.clearFlags();
        },

        //when +, -, *, or / are clicked (i.e., buttons that go between two values)
        addOp(op) {
            this.currentOp = op;
            this.leftValue = this.displayValue;
            this.clearNext = true;
        },
        log() {
            this.displayValue = Math.log10(this.displayValue);
            this.clearFlags();
        },
        inverse() {
            this.displayValue = 1 / this.displayValue;
            this.clearFlags();
        },

        //when number is added...left of decimal, shift all digits to the left one and add the number...right of decimal, just add the number
        addDigit(val) {
            if (this.clearNext) {
                this.displayValue = '0';
                this.clearNext = false;
            }
            if (val === '.') {
                if (this.decimalDisabled) { }
                else {
                    this.displayValue += '.';
                }
            }
            else {
                if (this.decimalDisabled) {
                    this.displayValue += val;
                }
                else {
                    this.displayValue = this.displayValue * 10 + val;
                }
            }
        },

        //= button clicked
        evaluate() {
            if (this.equalDisabled) { }
            else {
                this.displayValue = parseFloat(this.displayValue);
                this.leftValue = parseFloat(this.leftValue);
                if (this.currentOp === '+') {
                    this.displayValue = this.leftValue + this.displayValue;
                }
                else if (this.currentOp === '-') {
                    this.displayValue = this.leftValue - this.displayValue;
                }
                else if (this.currentOp === '*') {
                    this.displayValue = this.leftValue * this.displayValue;
                }
                else if (this.currentOp === '/') {
                    this.displayValue = this.leftValue / this.displayValue;
                }
                this.clearFlags();
            }
        },
        clearFlags() {
            this.currentOp = '';
            this.clearNext = true;
        }
    },

    //set disabled behavior based on fields that determine it...deicmal disabled if already decimal and equal disabled if no operator
    computed: {
        decimalDisabled: function () {
            return this.displayValue.toString().includes('.');
        },
        equalDisabled: function () {
            return this.currentOp === '';
        }
    }
})
