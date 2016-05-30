$(function() {
	var mynewtable = $('#examplex').editTable({
	    field_templates: {
	    	'displaybox': {
	    		html: '<span></span>',
	    		getValue: function (input) {
	                return $(input).html();
	            },
	            setValue: function (input, value) {
	                return $(input).html(value);
	            }
	    	},
	        'checkbox' : {
	            html: '<input type="checkbox"/>',
	            getValue: function (input) {
	                return $(input).is(':checked');
	            },
	            setValue: function (input, value) {
	                if ( value ){
	                    return $(input).attr('checked', true);
	                }
	                return $(input).removeAttr('checked');
	            }
	        },
	        'textarea' : {
	            html: '<textarea/>',
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	                return $(input).text(value);
	            }
	        },
	        'select' : {
	            html: '<select class="select1"><option value="1">一</option><option value="2">二</option><option value="3">三</option></select>',
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	                var select = $(input);
	                select.find('option').filter(function() {
	                    return $(this).val() == value; 
	                }).attr('selected', true);
	                return select;
	            }
	        }
	    },
	    row_template: ['checkbox', 'displaybox', 'text', 'textarea', 'select'],
	    headerCols: ['Yes/No','Date','Value','Description', 'Which?'],
	    first_row: false,
	    data: [
	        [false,"01/30/2013","50,00 €","你好！", '1'],
	        [true,"02/28/2013","50,00 €",'helloworld','2']
	    ],

	    // Checkbox validation
	    validate_field: function (col_id, value, col_type, $element) {
	        if ( col_type === 'checkbox' ) {
	            $element.parent('td').animate({'background-color':'#fff'});
	            if ( value === false ){
	                $element.parent('td').animate({'background-color':'#DB4A39'});
	                return false;
	            }
	        }
	        return true;
	    },
	    tableClass: 'inputtable custom'
	});
	
	$('#examplex').on('mousedown', '.select1', function() {
		rerenderList(this);
	});
	
	function rerenderList(el) {
		var $el = $(el);
		var allData = [{key: '1', value: '一'}, {key: '2', value: '二'}, {key: '3', value: '三'}];
		var allDataKey = allData.map(function(item, index) {
			return '' + item.key;
		});
		var fiterValue = $('.select1').not($el).map(function() {
			return $(this).val();
		}).get();
		var showValue = Array.minus(allDataKey, fiterValue);
		var selectValue = $el.val();
		var optionTpl = '';
		showValue.each(function(item) {
			optionTpl += '<option value="'+item+'">'+Dict.findName(allData, item, 'key', 'value')+'</option>';
		});
		$el.empty().html(optionTpl);
		$el.val(selectValue);
	}
	
	$('#examplexconsole').click(function(e) {

	    // Get data
	    console.log(mynewtable.getData());
	    console.log(mynewtable.getJsonData());

	    // Check if data are valid
	    if ( !mynewtable.isValidated() ){
	        alert('Not validated');
	    }

	    e.preventDefault();
	});
});
