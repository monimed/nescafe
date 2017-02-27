(function($,doc,outside){
  '$:nomunge'; // Used by YUI compressor.
  
  $.map(
    // All these events will get an "outside" event counterpart by default.
    'click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '),
    function( event_name ) { jq_addOutsideEvent( event_name ); }
  );
  
  // The focus and blur events are really focusin and focusout when it comes
  // to delegation, so they are a special case.
  jq_addOutsideEvent( 'focusin',  'focus' + outside );
  jq_addOutsideEvent( 'focusout', 'blur' + outside );
  
  // Method: jQuery.addOutsideEvent
  // 
  // Register a new "outside" event to be with this method. Adding an outside
  // event that already exists will probably blow things up, so check the
  // <Default "outside" events> list before trying to add a new one.
  // 
  // Usage:
  // 
  // > jQuery.addOutsideEvent( event_name [, outside_event_name ] );
  // 
  // Arguments:
  // 
  //  event_name - (String) The name of the originating event that the new
  //    "outside" event will be powered by. This event can be a native or
  //    custom event, as long as it bubbles up the DOM tree.
  //  outside_event_name - (String) An optional name for the new "outside"
  //    event. If omitted, the outside event will be named whatever the
  //    value of `event_name` is plus the "outside" suffix.
  // 
  // Returns:
  // 
  //  Nothing.
  
  $.addOutsideEvent = jq_addOutsideEvent;
  function jq_addOutsideEvent( event_name, outside_event_name ) {
    outside_event_name = outside_event_name || event_name + outside;
    var elems = $(),
      event_namespaced = event_name + '.' + outside_event_name + '-special-event';
    $.event.special[ outside_event_name ] = {
      setup: function(){
        elems = elems.add( this );
        if ( elems.length === 1 ) {
          $(doc).bind( event_namespaced, handle_event );
        }
      },
      teardown: function(){
        elems = elems.not( this );
        if ( elems.length === 0 ) {
          $(doc).unbind( event_namespaced );
        }
      },
      add: function( handleObj ) {
        var old_handler = handleObj.handler;
        handleObj.handler = function( event, elem ) {
          event.target = elem;
          old_handler.apply( this, arguments );
        };
      }
    };
    function handle_event( event ) {
      $(elems).each(function(){
        var elem = $(this);
        if ( this !== event.target && !elem.has(event.target).length ) {
          elem.triggerHandler( outside_event_name, [ event.target ] );
        }
      });
    };
    
  };
  
})(jQuery,document,"outside");