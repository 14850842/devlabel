<?php global $post; ?>

<?php $page =  get_page_by_title('About'); ?>

<section id="about">
	<div class="container">
		<header class="section-heading text-center">
			<div class="sub-heading"><?php echo get_the_title($page->ID);?></div>
			<?php $sub_heading = get_post_meta($page->ID,'_ppm_sub_heading',true);?>
			<h2><?php echo esc_attr($sub_heading);?></h2>
		</header>

		<div class="lead-image">
			<?php
			$post_thumbnail_id = get_post_thumbnail_id( $page->ID );
			$default = array('class'=>'img-responsive');
			echo wp_get_attachment_image( $post_thumbnail_id,'full','',$default);
			?>
		</div>
		<?php

		// The Query
		$the_query = new WP_Query( array('post_parent'=>$page->ID,'post_type'=>'page','orderby'=>'menu_order','order'=>'ASC'));
		$default = array('class'=>'img-responsive pull-left');
		// The Loop
		if ( $the_query->have_posts() ) { $count = 0;?>
			<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
			 	<h3 class="title text-center"><?php the_title();?></h3>
				<div class="media">
				  	<?php the_post_thumbnail('full',$default);?>
				  	<div class="media-body">
				   		<?php the_content();?>
				  	</div>
				</div>
				<p class="text-center"><a href="#contact" class="scrollit btn btn-success">Contact Us</a></p>
			<?php } ?>
		<?php
		}
		wp_reset_postdata();
		?>
	</div> <!-- container -->
</section><!--/.services-->