<?php global $brew_options;?>

<?php $page =  get_page_by_title('Contact'); ?>

<section id="contact">
	<div class="container">
		<header class="section-heading text-center">
			<div class="sub-heading"><?php echo get_the_title($page->ID);?></div>
			<?php $sub_heading = get_post_meta($page->ID,'_ppm_sub_heading',true);?>
			<h2><?php echo esc_attr($sub_heading);?></h2>
		</header>

		<div class="row">
			<div class="col-sm-8">
				<?php gravity_form(1, false, false, false, '', true, 12); ?>
			</div>
			<div class="col-sm-4">
				<?php
				// The Query
				$the_query = new WP_Query( 'pagename=contact' );

				// The Loop
				if ( $the_query->have_posts() ) { ?>

					<?php while ( $the_query->have_posts() ) { $the_query->the_post(); ?>
						<div class="entry">
							<?php the_content(); ?>

				        </div>

						<ul class="fa-ul">
							<?php if (!empty($brew_options['address'])) : ?>
								<li>
									<span class="fa fa-li fa-map-marker fa-3x fa-fw"></span>
									<?php echo wpautop($brew_options['address'] ); ?>
								</li>
							<?php endif; ?>
							<?php if (!empty($brew_options['telephone'])) : ?>
								<li>
									<span class="fa fa-li fa-mobile fa-3x fa-fw"></span>
									<?php echo wpautop($brew_options['telephone'] ); ?>
								</li>
							<?php endif;?>
							<?php if (!empty($brew_options['email'])) : ?>
								<li>
									<span class="fa fa-li fa-envelope fa-3x fa-fw"></span>
									<?php echo wpautop($brew_options['email'] ); ?>
								</li>
							<?php endif; ?>
						</ul>

					<?php } ?>
				<?php
				}
				wp_reset_postdata();
				?>
			</div>
		</div>

	</div>
</section><!--/.contact-->
