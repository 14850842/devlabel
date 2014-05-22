<?php global $post; ?>

<?php $page =  get_page_by_title('News'); ?>

<section id="news">
	<div class="container">
		<header class="section-heading text-center">
			<div class="sub-heading"><?php echo get_the_title($page->ID);?></div>
			<?php $sub_heading = get_post_meta($page->ID,'_ppm_sub_heading',true);?>
			<h2><?php echo esc_attr($sub_heading);?></h2>
		</header>

		<?php
		$query_args = array('post_type' => 'post', 'posts_per_page' => 10);
		query_posts( $query_args );
		if ( have_posts() ) { $count = 0;
		?>
			<div class="news-wrapper">
				<?php while ( have_posts() ) { the_post(); $count++; $default = array('class'=>'img-responsive pull-left'); ?>
					<div class="news-item">
						<div class="news-img">
							<?php the_post_thumbnail('medium',$default); ?>
						</div><!--/.news-image-->

						<div class="news-text">
							<h3 class=""><?php the_title();?></h3>
							<?php the_content();?>
						</div><!--/.news-text-->
					</div>

					<div class="news-item">
						<div class="news-img">
							<?php the_post_thumbnail('medium',$default); ?>
						</div><!--/.news-image-->

						<div class="news-text">
							<h3 class=""><?php the_title();?></h3>
							<?php the_content();?>
						</div><!--/.news-text-->
					</div>

					<div class="news-item">
						<div class="news-img">
							<?php the_post_thumbnail('medium',$default); ?>
						</div><!--/.news-image-->

						<div class="news-text">
							<h3 class=""><?php the_title();?></h3>
							<?php the_content();?>
						</div><!--/.news-text-->
					</div>

					<div class="news-item">
						<div class="news-img">
							<?php the_post_thumbnail('medium',$default); ?>
						</div><!--/.news-image-->

						<div class="news-text">
							<h3 class=""><?php the_title();?></h3>
							<?php the_content();?>
						</div><!--/.news-text-->
					</div>

					<div class="news-item">
						<div class="news-img">
							<?php the_post_thumbnail('medium',$default); ?>
						</div><!--/.news-image-->

						<div class="news-text">
							<h3 class=""><?php the_title();?></h3>
							<?php the_content();?>
						</div><!--/.news-text-->
					</div>

				<?php } // End WHILE Loop ?>

			</div>
		<?php } else {
			get_template_part( 'content', 'noposts' );
		} // End IF Statement
		?>
	</div> <!-- container -->
</section><!--/.services-->