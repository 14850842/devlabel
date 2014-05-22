<?php global $post; ?>

<?php $page =  get_page_by_title('Partners'); ?>

<section id="partners">
	<div class="container">
		<div class="row">
			<div class="col-md-4">
				<?php
				// The Query
				$the_query = new WP_Query( array('p'=>$page->ID,'post_type'=>'page'));
				$default = array('class'=>'img-responsive');
				// The Loop
				if ( $the_query->have_posts() ) { $count = 0;?>
					<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
						<h2 class="title"><?php the_title();?></h2>
						<?php the_content();?>
					<?php } ?>
				<?php
				}
				wp_reset_postdata();
				?>
			</div>
			<div class="col-md-offset-2 col-md-6">
				<?php
				// The Query
				$the_query = new WP_Query( array('post_type'=>'features','category'=>'partners'));
				$default = array('class'=>'img-responsive');
				// The Loop
				if ( $the_query->have_posts() ) { $count = 0;?>
					<div class="row">
					<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
						<div class="col-md-4">
							<?php the_post_thumbnail('thumbnail',$default);?>
						</div>
						<?php if ($count %3 == 0) echo '<div class="clearfix"></div>';?>
					<?php } ?>
					</div>
				<?php
				}
				wp_reset_postdata();
				?>
			</div>
		</div>
	</div> <!-- container -->
</section><!--/.services-->