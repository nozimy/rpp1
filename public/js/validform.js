(function() {

    var app = {

        initialize : function () {
            //this.modules();
            console.log('initialize');
            this.setUpListeners();
        },

        // modules: function () {
        //
        // },

        setUpListeners: function () {
            console.log('setuplisteners start');
            $('form').on('submit', app.submitForm);
            console.log('setuplisteners finish submitForm');
            $('form').on('keyDown', 'input', app.removeError);
            console.log('setuplisteners finish removeError');
        },

        submitForm: function (e) {
            e.preventDefault();

            console.log('submitForm');
            var form = $(this),
                submitBtn = form.find('button[type="submit"]');

            if(app.validateForm(form) === false) return false;

            submitBtn.attr('disabled', 'disabled');

            str = form.serialize();
            $.ajax({
                url: 'contact_form/contact_process',
                type: 'POST',
                //dataType: ,
                data: str
            })
            .done(function (msg) {
                if(msg === 'OK'){
                    var result = "<div class = 'bg-success'>Спасибо за заявку</div>";
                    form.html(result);
                }else{
                    form.html(msg);

                }
                console.log('success')
            })
            .fail(function () {
                console.log('error')
            })
            .always(function () {
               submitBtn.removeClass('disabled');
            });

        },

        validateForm: function(form){
            var inputs = form.find('input');
            var valid = true;

            inputs.tooltip('hide');

            $.each(inputs, function(index, val){
                var input = $(val),
                    val = input.val(),
                    formGroup = input.parents('.form-group'),
                    label = formGroup.find('label').text().toLowerCase(),
                    textError = 'Введите ' + label;

                if (val.length === 0 ){
                    formGroup.addClass('has-error').removeClass('has-success');
                    input.tooltip({
                        trigger: 'manual',
                        placement: 'right',
                        title: textError
                    }).tooltip('show');
                    valid = false;
                    console.log('validateForm IF');
                }else{
                    formGroup.addClass('has-success').removeClass('has-error');
                    console.log('validateForm ELSE');
                }
            });
            return valid;
            console.log('validateForm finish');
        },

        removeError: function(){
            $(this).tooltip('destroy').parents(".form-group").removeClass('has-error');
            //$(this).parent('.form-group').removeClass('has-error');
            console.log('removeError');
        }

    }

    app.initialize();

}());