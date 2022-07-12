var PixiesetTheme=(function(my,$){function initCoverPhoto()
{var $collectionCoverEl=$('#collection-cover'),previewWarningOffset=0;if($('#preview-warning').length>0)
previewWarningOffset=$('#preview-warning').height();if($collectionCoverEl.length>0){if($('#nav-wrapper-mobile').is(':visible')){$collectionCoverEl.css('height',$(window).height()-previewWarningOffset);}else{$collectionCoverEl.css('height',$(window).height()-previewWarningOffset);$(window).resize(function(){$collectionCoverEl.css('height',$(window).height()-previewWarningOffset);});}
$('#collection-cover .cover-arrow a').on('click',function(e){e.preventDefault();PixiesetHelpers.scrollPastCover();});}}
my.init=function(){initCoverPhoto();};return my;}(window.PixiesetTheme||{},jQuery));