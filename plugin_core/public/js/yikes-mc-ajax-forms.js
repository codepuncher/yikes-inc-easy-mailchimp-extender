(function( $ ) {	'use strict';	$( document ).ready( function() {				/* On Submission, run our ajax shtuff */		$( 'body' ).on( 'submit' , '.yikes-easy-mc-form' , function() {						/* Checkbox Interest Group Error */			var required_fields_left_blank = [];			/* Check for any required interest groups */			if( jQuery( '.yikes-interest-group-required' ).length > 0 ) {				/* loop and make sure that it's checked */				jQuery( '.yikes-interest-group-required' ).each( function() {					var id = jQuery( this ).attr( 'name' );					var interest_group_id = id.replace( '[]', '' );					if( jQuery( 'input[name="'+interest_group_id+'[]"]:checked' ).length == 0 ) {						var interest_group_name = jQuery( 'span.'+interest_group_id+'-label' ).text();						required_fields_left_blank[interest_group_id] = interest_group_name;					}				});			}									/* Loop, display the errors and prevent form submission from occuring */			if( ! jQuery.isEmptyObject( required_fields_left_blank ) ) {				/* Remove any visible checkbox group errors */				if( jQuery( '.yikes-mailchimp-interest-group-required-notice' ).length > 0 ) {					jQuery( '.yikes-mailchimp-interest-group-required-notice' ).fadeOut( 'fast', function() {						jQuery( '.yikes-mailchimp-interest-group-required-notice' ).remove();						for ( var field_id in required_fields_left_blank ) {							jQuery( 'span.'+field_id+'-label' ).after( '<p class="yikes-mailchimp-interest-group-required-notice">'+object.interest_group_checkbox_error+'</p>' );						}					});				} else {					for ( var field_id in required_fields_left_blank ) {						jQuery( 'span.'+field_id+'-label' ).after( '<p class="yikes-mailchimp-interest-group-required-notice">'+object.interest_group_checkbox_error+'</p>' );					}				}				return false;			}						/* End Interest Group Error */						/* store which form was submitted */			var submitted_form = $( this );							/* disable the button to prevent double click */			submitted_form.find( '.yikes-easy-mc-submit-button' ).attr( 'disabled' , 'disabled' );									/* hide our previously displayed success and error messages  */			$( '.yikes-easy-mc-error-message' ).remove();			$( '.yikes-easy-mc-success-message' ).remove();						/* build our data */			var data = {				'action' : 'process_form_submission',				'form_data' : submitted_form.serialize(),				'list_id' : object.list_id,				'optin_settings' : object.optin_settings,				'submission_settings' : object.submission_settings,				'error_messages' : object.error_messages,				'notifications' : object.notifications,				'form_id' : object.form_id,				'page_data' : object.page_data			};							/* submit our ajax request */			$.ajax({				url: object.ajax_url,				type: 'POST',				data: data,				success : function( response, textStatus, jqXHR) { 						if( response.error == 1 ) { /* error catch  */						if( $( '.yikes-easy-mc-form-description-'+object.form_id ).length > 0 ) {							 $( '.yikes-easy-mc-form-description-'+object.form_id ).before( '<p class="yikes-easy-mc-error-message yikes-easy-mc-error-message-'+object.form_id+'" yikes-easy-mc-hidden">'+response.response+'</p>' );						} else {							submitted_form.before( '<p class="yikes-easy-mc-error-message yikes-easy-mc-error-message-'+object.form_id+' yikes-easy-mc-hidden">'+response.response+'</p>' );						}						/* fade in the error message */						$( '.yikes-easy-mc-error-message' ).fadeIn();					} else { /* success */						if( response.hide == 1 ) {								/* hide the description if visible */							if( $( '.yikes-easy-mc-form-description-'+object.form_id ).length > 0 ) {								$( '.yikes-easy-mc-form-description-'+object.form_id ).hide();							}							/* hide the form */							submitted_form.hide();						}						if( $( '.yikes-easy-mc-form-description-'+object.form_id ).length > 0 ) {							 $( '.yikes-easy-mc-form-description-'+object.form_id ).before( '<p class="yikes-easy-mc-success-message yikes-easy-mc-success-message-'+object.form_id+' yikes-easy-mc-hidden">'+response.response+'</p>' );						} else {							submitted_form.before( '<p class="yikes-easy-mc-success-message yikes-easy-mc-success-message-'+object.form_id+' yikes-easy-mc-hidden">'+response.response+'</p>' );						}						/* fade in our success message */						$( '.yikes-easy-mc-success-message-'+object.form_id ).fadeIn();						$( '.yikes-mailchimp-interest-group-required-notice' ).remove();																			/* redirect if setup */						if( response.redirection == 1 ) {							submitted_form.before( response.redirect );						}						/* clear the inputs */						submitted_form.find( 'input' ).not( '.yikes-easy-mc-submit-button' ).val( '' );						/* ajax to increase submission count by 1 */						var new_data = {							'action' : 'increase_submission_count',							'form_id' : object.form_id						};						$.ajax({							url: object.ajax_url,							type: 'POST',							data: new_data,							success : function( response, textStatus, jqXHR) {								/* console.log( 'submission count increased by 1' ); */							},							error : function( jqXHR, textStatus, errorThrown ) { 								/* display the error back to the user in the console */								console.error( errorThrown );							}						});						/* console.log( 'Successfully submit subscriber data to MailChimp.' ); */					}				},				error : function( jqXHR, textStatus, errorThrown ) {  /* someother error is happening, and should be investigated... */					/* alert( errorThrown ); */					console.error( errorThrown );					console.log( jqXHR );					console.log( textStatus );				},				complete : function( jqXHR, textStatus ) {					/* console.log( 'Yikes Easy MailChimp AJAX submission complete.' ); */					/* enable the button to prevent double click */					submitted_form.find( '.yikes-easy-mc-submit-button' ).removeAttr( 'disabled' , 'disabled' );				}			});			/* prevent default form action */			return false;		});		});})( jQuery );