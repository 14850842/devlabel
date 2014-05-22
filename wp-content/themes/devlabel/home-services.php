<?php global $post; ?>

<?php $page =  get_page_by_title('The Essentials'); ?>

<section id="services">
	<div class="container">
		<header class="section-heading text-center">
			<h2 class="title"><?php echo get_the_title($page->ID);?></h2>
		</header>

		<?php

		// The Query
		$the_query = new WP_Query( array('post_parent'=>$page->ID,'post_type'=>'page','orderby'=>'menu_order','order'=>'ASC'));
		$default = array('class'=>'img-responsive');
		// The Loop
		if ( $the_query->have_posts() ) { $count = 0;?>
			<div class="row">
				<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
				  <div class="col-sm-6 col-md-3">
				    <div class="thumbnail text-center">
				    	<div class="images">
				      		<?php the_post_thumbnail('blog-image',$default); ?>
				      		<?php $logo = get_post_meta($post->ID,'_ppm_service_image_id',true); ?>
				      		<?php echo wp_get_attachment_image( $logo,'blog-image','',$default);?>
				      	</div>
				      	<div class="caption">
				        	<h4><span class="bg-primary"><?php the_title();?></span></h3>
				        	<?php the_content(); ?>
				      	</div>
				    </div>
				  </div>
				<?php } ?>
			</div> <!-- row -->
		<?php
		}
		wp_reset_postdata();
		?>
	</div> <!-- container -->
</section><!--/.services-->