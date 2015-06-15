<?php	// get the Yikes Inc. MailChimp contributors via the Github API	if ( false === ( $contributors = get_transient( 'yikes-mailchimp-contributor-transient' ) ) ) {		// It wasn't there, so regenerate the data and save the transient		$contributors = wp_remote_get( 'https://api.github.com/repos/yikesinc/yikes-inc-easy-mailchimp-extender/contributors?per_page=100', array( 'timeout' => 120 ) );		$contributors = json_decode( $contributors['body'] , true );		set_transient( 'yikes-mailchimp-contributor-transient', $contributors, 60*60*12 );	}?><div class="wrap about-wrap">		<div class="feature-section">				<p><?php echo '<strong>' . __( 'Easy MailChimp' , 'yikes-inc-easy-mailchimp-extender' ) . '</strong> ' . __( "is a free plugin licensed under GPL v2, and was meticulously constructed with a whole lot of love by the folks over at" , 'yikes-inc-easy-mailchimp-extender' ) . ' <a href="http://www.yikesinc.com" target="_blank" title="Yikes Inc.">Yikes Inc.</a>'; ?></p>				<div id="credit-container">						<?php				if( !empty( $contributors ) ) {					$old_contributors = array( 'seriouslysean' , 'Apfelbiss' );						foreach( $contributors as $contributor ) {							// skip contributors from our old plugin (this is a new re-write)							if( !in_array( $contributor['login'] , $old_contributors ) ) {								?>								<a href="<?php echo esc_url_raw( $contributor['html_url'] ); ?>" title="<?php echo $contributor['login']; ?>" target="_blank" class="github-avatar-url">									<div class="team-member">										<img src="<?php echo esc_url_raw( $contributor['avatar_url'] ); ?>" class="github-avatar-image">										<p class="member-blurb">											<p><strong><?php echo $contributor['login']; ?></strong></p>										</p>									</div>								</a>								<?php							}						}				} else {					?>						<h4><?php _e( 'There was an error retreiving the contributors list. Please try again later.' , 'yikes-inc-easy-mailchimp-extender' ); ?></h4>					<?php				}			?>			</div>			</div>	</div>