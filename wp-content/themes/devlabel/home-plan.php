<?php global $post; ?>

<?php $page =  get_page_by_title('Our 4-Step Process'); ?>

<section id="process">
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
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
						<div class="swiper-slide">
							<div class="row">
								<div class="col-md-offset-2 col-md-4">
									<?php the_post_thumbnail('medium',$default);?>
								</div>
								<div class="col-md-4">
									<h4><span class="bg-info"><?php the_title();?></span></h4>
									<h5 class="text-info">Friendly</h5>
									<h6>Discuss / Analyze / Discover</h6>
									<?php the_content();?>
								</div>
							</div>
						</div>
					<?php } ?>
				</div> <!-- swiper-wrapper -->
			</div> <!-- swipper-container -->
		<?php
		}
		wp_reset_postdata();
		?>
	</div> <!-- container -->
	<div class="swiper-scrollbar text-center"></div>  
</section><!--/.services-->