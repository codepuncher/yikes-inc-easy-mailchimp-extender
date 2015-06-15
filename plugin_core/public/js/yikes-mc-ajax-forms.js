(function( $ ) {	'use strict';	$( document ).ready( function() {				/* On Submission, run our ajax shtuff */		$( 'body' ).on( 'submit' , '.yikes-easy-mc-form' , function() {					/* store which form was submitted */			var submitted_form = jQuery( this );						/* disable the button to prevent double click */			submitted_form.find( '.yikes-easy-mc-submit-button' ).attr( 'disabled' , 'disabled' );						var submitted_form = $( this );						/* hide our previously displayed success and error messages  */			$( '.yikes-easy-mc-error-message' ).remove();			$( '.yikes-easy-mc-success-message' ).remove();						/* build our data */			var data = {				'action' : 'process_form_submission',				'form_data' : $( '.yikes-easy-mc-form' ).serialize(),				'list_id' : object.list_id,				'optin_settings' : object.optin_settings,				'submission_settings' : object.submission_settings,				'error_messages' : object.error_messages,				'notifications' : object.notifications,				'form_id' : object.form_id			};						console.log( data );						/* console.log( data.form_data ); */			/* submit our ajax request */			$.ajax({				url: object.ajax_url,				type: 'POST',				data: data,				success : function( response, textStatus, jqXHR) { 								if( response.error == 1 ) { /* error catch  */						if( $( '.yikes-easy-mc-form-description-'+object.form_id ).length > 0 ) {							 $( '.yikes-easy-mc-form-description-'+object.form_id ).before( '<p class="yikes-easy-mc-error-message yikes-easy-mc-error-message-'+object.form_id+'" yikes-easy-mc-hidden">'+response.response+'</p>' );						} else {							submitted_form.before( '<p class="yikes-easy-mc-error-message yikes-easy-mc-error-message-'+object.form_id+' yikes-easy-mc-hidden">'+response.response+'</p>' );						}						/* fade in the error message */						$( '.yikes-easy-mc-error-message' ).fadeIn();					} else { /* success */						if( response.hide == 1 ) {								/* hide the description if visible */							if( $( '.yikes-easy-mc-form-description-'+object.form_id ).length > 0 ) {								$( '.yikes-easy-mc-form-description-'+object.form_id ).hide();							}							/* hide the form */							submitted_form.hide();						}						if( $( '.yikes-easy-mc-form-description-'+object.form_id ).length > 0 ) {							 $( '.yikes-easy-mc-form-description-'+object.form_id ).before( '<p class="yikes-easy-mc-success-message yikes-easy-mc-success-message-'+object.form_id+' yikes-easy-mc-hidden">'+response.response+'</p>' );						} else {							submitted_form.before( '<p class="yikes-easy-mc-success-message yikes-easy-mc-success-message-'+object.form_id+' yikes-easy-mc-hidden">'+response.response+'</p>' );						}						/* fade in our success message */						$( '.yikes-easy-mc-success-message-'+object.form_id ).fadeIn();						/* redirect if setup */						if( response.redirection == 1 ) {							submitted_form.before( response.redirect );						}						/* clear the inputs */						submitted_form.find( 'input' ).not( '.yikes-easy-mc-submit-button' ).val( '' );						/* ajax to increase submission count by 1 */						var new_data = {							'action' : 'increase_submission_count',							'form_id' : object.form_id						};						$.ajax({							url: object.ajax_url,							type: 'POST',							data: new_data,							success : function( response, textStatus, jqXHR) {								console.log( 'submission count increased by 1' );							},							error : function( jqXHR, textStatus, errorThrown ) { 								/* display the error back to the user in the console */								console.error( errorThrown );							}						});						console.log( 'Successfully submit subscriber data to MailChimp.' );					}				},				error : function( jqXHR, textStatus, errorThrown ) { 					alert( errorThrown );					console.error( errorThrown );					console.log( jqXHR );					console.log( textStatus );				},				complete : function( jqXHR, textStatus ) {					console.log( 'Yikes Easy MailChimp AJAX submission complete.' );					/* enable the button to prevent double click */					submitted_form.find( '.yikes-easy-mc-submit-button' ).removeAttr( 'disabled' , 'disabled' );				}			});			/* prevent default form action */			return false;		});		});})( jQuery );