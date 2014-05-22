<?php global $brew_options; ?>	
	<footer id="footer" class="clearfix">
		<div class="container">
		  <div class="row">
			<div class="col-md-4 copyright">
			  &copy; <?php echo date('Y'); ?> Copyright <?php bloginfo( 'name' ); ?>.
			</div>
			<div class="col-md-4 col-md-offset-4 attribution">
				<?php if (!empty($brew_options['twitter_url'])) : ?>
		            <a href="<?php echo $brew_options['twitter_url'];?>" target="_blank">
		                <span class="fa-stack fa-lg">
							<i class="fa fa-circle fa-stack-2x"></i>
							<i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
			  			</span>
		            </a>
		        <?php endif;?>
		        <?php if (!empty($brew_options['googleplus_url'])) : ?>
		            <a href="<?php echo $brew_options['googleplus_url'];?>" target="_blank">
		                <span class="fa-stack fa-lg">
							<i class="fa fa-circle fa-stack-2x"></i>
							<i class="fa fa-google-plus fa-stack-1x fa-inverse"></i>
						</span>
		            </a>
		        <?php endif;?>
			</div>
		  </div> <!-- end .row -->
		</div>
	</footer> <!-- end footer -->

	<!-- all js scripts are loaded in library/bones.php -->
	<?php wp_footer(); ?>
	<!-- Hello? Doctor? Name? Continue? Yesterday? Tomorrow?  -->

  </body>

</html> <!-- end page. what a ride! -->