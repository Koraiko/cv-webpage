import React from 'react';
import ScrollInOut from './ScrollInOut';
import './AnimationExamples.css';

// ========================================================================================
// EXAMPLE COMPONENTS DEMONSTRATING SCROLL ANIMATIONS
// ========================================================================================

/**
 * Example component showing various scroll animations
 */
const AnimationExamples: React.FC = () => {
    return (
        <div className="p-0 m-0">
            {/* Header Section */}
            <section className="hero-section">
                <ScrollInOut direction="fade">
                    <h1 className="hero-title">
                        Scroll Animation Examples
                    </h1>
                </ScrollInOut>
                <ScrollInOut direction="left" >
                    <p className="hero-subtitle">
                        Demonstrating GSAP scroll-triggered animations
                    </p>
                </ScrollInOut>
            </section>

            {/* Basic Animations */}
            <section className="basic-animations">
                <ScrollInOut direction="right">
                    <div className="animation-card">
                        <h2>Slide from Right</h2>
                        <p>This card slides in from the right when it enters the viewport.</p>
                    </div>
                </ScrollInOut>
                <ScrollInOut direction="left">
                    <div className="animation-card">
                        <h2>Slide from Left</h2>
                        <p>This card slides in from the left when it enters the viewport.</p>
                    </div>
                </ScrollInOut>

                <ScrollInOut direction="scale" ease="back.out(2)">
                    <div className="animation-card">
                        <h2>Scale with Bounce</h2>
                        <p>This card scales in with a bounce effect using back.out easing.</p>
                    </div>
                </ScrollInOut>

                <ScrollInOut direction="fade" duration={5}>
                    <div className="animation-card">
                        <h2>Custom Animation</h2>
                        <p>This card fades in smoothly.</p>
                    </div>
                </ScrollInOut>
            </section>

            {/* Animated List */}
            <section className="list-section">
                <h2>Animated List</h2>
                <ul className="animated-list">
                    <ScrollInOut direction="left" stagger={0.3} >
                        <li>First item slides in from left</li>
                        <li>Second item follows with a stagger delay</li>
                        <li>Third item continues the sequence</li>
                        <li>Fourth item completes the animation</li>
                        <li>All items are synchronized beautifully</li>
                    </ScrollInOut>
                </ul>
            </section>

            {/* Animated Grid */}
            <section className="grid-section">
                <h2>Animated Grid</h2>
                <ScrollInOut direction="left" animateLeftToRight={false} stagger={0.035} className="animated-grid">
                    <div className="grid-item">Grid Item 1</div>
                    <div className="grid-item">Grid Item 2</div>
                    <div className="grid-item">Grid Item 3</div>
                </ScrollInOut>
                <ScrollInOut direction="right" stagger={0.035} className="animated-grid mt-2">
                    <div className="grid-item">Grid Item 4</div>
                    <div className="grid-item">Grid Item 5</div>
                    <div className="grid-item">Grid Item 6</div>
                </ScrollInOut>
            </section>

            {/* Multiple Direction Examples */}
            <section className="direction-examples">
                <h2>Different Directions</h2>
                <div className="direction-grid">
                    <DirectionExample direction="left" />
                    <DirectionExample direction="right" />
                    <DirectionExample direction="fade" />
                    <DirectionExample direction="scale" />
                </div>
            </section>


            <section className="basic-animations">


                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum tellus, tristique nec consequat imperdiet, ornare eget nisl. Donec eget varius enim, a pharetra sem. Phasellus pretium justo a nunc luctus rhoncus. Sed eu enim eget dui vehicula aliquam id ac felis. Ut sollicitudin, felis sit amet sollicitudin porta, enim diam semper tellus, at mattis lorem dui id dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec enim ex, placerat quis justo id, dignissim aliquam eros. Sed eget orci laoreet, consectetur dui lobortis, convallis ex. Etiam aliquam posuere tortor non placerat. In commodo lobortis dolor ut lobortis. Vestibulum aliquet accumsan metus non accumsan. Maecenas nec eros ac justo bibendum ultrices a nec augue. Cras a dui condimentum, laoreet nunc eu, ornare ipsum. Morbi quis enim vel libero fringilla commodo ac quis lacus.

                Fusce rutrum magna non odio pulvinar scelerisque. Cras orci erat, tincidunt vitae convallis id, efficitur non enim. Nulla consequat feugiat libero vitae tempus. Morbi nec risus nisl. Etiam massa sem, blandit quis risus at, facilisis molestie lacus. Cras condimentum neque quis tincidunt aliquet. Praesent odio nisl, porttitor eu dui nec, ultrices iaculis neque. Etiam et porta odio, sed lobortis metus.

                Mauris aliquam, ante non mollis condimentum, odio dui eleifend ex, rutrum vehicula dui nibh sit amet magna. Etiam nunc tellus, tempor sed venenatis vitae, egestas sed metus. Proin nisi leo, ornare vel consequat vel, rutrum quis ante. Mauris convallis at quam vel euismod. Nullam vestibulum nunc eu velit facilisis finibus. In tincidunt tincidunt semper. Ut mattis, velit eget pulvinar commodo, mauris leo ultrices enim, eget malesuada urna quam convallis eros. Donec bibendum dignissim mi, sit amet tincidunt mi maximus at. Donec convallis aliquam leo, sit amet vestibulum magna laoreet eu. Sed imperdiet ex sit amet suscipit convallis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum cursus sagittis scelerisque. Maecenas placerat mattis volutpat. Nullam venenatis, diam sit amet consequat vehicula, velit leo hendrerit ipsum, vitae aliquet magna tellus ut ipsum. Etiam tincidunt ornare nunc vel efficitur.

                Fusce ut faucibus lorem, in posuere dui. Morbi placerat ipsum est, in interdum justo tincidunt ac. Mauris ullamcorper quam in lacus eleifend, a efficitur justo venenatis. Integer feugiat magna at lectus vulputate suscipit. Pellentesque faucibus vel arcu eget iaculis. Nunc suscipit, nunc sit amet blandit ultrices, ex diam porttitor sapien, et scelerisque nulla nibh a ex. Donec ut diam eu felis suscipit volutpat. Pellentesque dolor libero, placerat fringilla gravida vel, ornare elementum lorem. Pellentesque rhoncus nunc lorem, eu faucibus metus suscipit vel. Fusce eget neque aliquam orci elementum tincidunt. Donec sit amet turpis et libero sodales rhoncus ac sed dolor. Praesent mollis diam magna, ac lobortis arcu blandit in. Etiam semper purus at condimentum vestibulum. Sed condimentum, nisi id porta rhoncus, nunc libero volutpat erat, ac auctor ex nulla nec erat.

                Aliquam pharetra, augue sit amet auctor egestas, libero diam tristique risus, sed euismod metus arcu quis risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec tempor elit. Aenean eu semper odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Maecenas sit amet suscipit quam, et feugiat felis. Morbi pulvinar vitae odio eu vestibulum. Donec aliquam nisl nec arcu facilisis, non consectetur turpis fermentum. Nunc a dui ante. Aenean fermentum, quam ut congue gravida, enim lorem fermentum tellus, in finibus tortor ante et ligula. Integer fringilla orci maximus neque imperdiet porttitor. Nunc luctus eget augue faucibus cursus. Mauris id ante a odio tincidunt lobortis. Maecenas interdum lacus in vestibulum venenatis. Cras egestas sagittis eros in rutrum.

                Duis erat quam, vestibulum quis dapibus ac, eleifend sed urna. Praesent tempus viverra tellus ac auctor. Pellentesque tincidunt ante vel dui eleifend, dapibus cursus elit varius. Donec sit amet urna quis nunc tristique egestas. Nullam volutpat id neque id vestibulum. Donec euismod commodo justo ut ullamcorper. Pellentesque pulvinar, purus vel finibus sagittis, elit felis viverra nunc, sed laoreet est leo sit amet velit. Nullam tincidunt risus ac dolor commodo posuere. Morbi nec diam eget enim sagittis placerat aliquam vel urna. Pellentesque id nunc porta, tristique elit sit amet, rhoncus quam. Praesent nec tempus sem. Nulla et nulla est.

                Aenean at rutrum enim. Maecenas tortor sem, efficitur et suscipit vel, elementum vitae orci. Etiam tincidunt, ante vel eleifend consectetur, quam est laoreet velit, sit amet lobortis libero sapien id arcu. Quisque a auctor tortor. Etiam sagittis leo nisl, id semper metus luctus a. Etiam vitae venenatis dui. Duis diam purus, consequat ut massa nec, pellentesque accumsan diam. Morbi in turpis sit amet ante pharetra suscipit. Curabitur pretium suscipit mattis. Nulla facilisis mollis nibh quis mattis. Donec suscipit vel tellus eu euismod. Nullam ornare tempor justo, a mollis nulla porta ut. Praesent vel scelerisque justo, a molestie tellus. In molestie, sem id convallis venenatis, augue eros ultricies lectus, non bibendum est odio porttitor ipsum. Curabitur aliquam ut tortor ac molestie. Aenean dapibus sodales dui quis finibus.

                Fusce fermentum leo pretium nibh viverra, sit amet lacinia dolor lobortis. Sed eu neque at sem pretium rhoncus. Aliquam at luctus odio. Maecenas vehicula finibus pellentesque. Curabitur vitae fermentum elit. Donec a urna nec nibh vestibulum lacinia. Praesent convallis erat orci, ut consectetur purus tincidunt ac. Fusce eu blandit massa. Pellentesque quam neque, finibus at ligula eget, interdum varius magna. Proin eu tincidunt nisl. Nulla elit dolor, aliquet vel semper nec, finibus in massa. Vivamus quis metus ac massa hendrerit eleifend a tempus libero. Proin in consequat quam.

                Aenean auctor et lectus at placerat. Nunc ligula augue, ultrices id eros vel, feugiat maximus neque. Nunc finibus auctor mauris, non egestas elit mollis at. Aliquam commodo tortor nec dolor commodo, id tempor felis mollis. Praesent pellentesque dui nibh, quis efficitur sapien malesuada varius. Suspendisse convallis, massa et suscipit dignissim, urna turpis ullamcorper libero, at fermentum nulla nulla eu lorem. Aliquam sollicitudin, ante non egestas efficitur, nunc enim maximus urna, non luctus quam lorem vel arcu. Donec molestie, purus sit amet maximus bibendum, libero diam pulvinar metus, vel ultricies leo neque eu metus. Nulla id metus tristique, ultrices augue eu, feugiat arcu. Fusce sit amet pulvinar ipsum. Morbi tristique posuere augue at consequat. Ut et lectus eget risus commodo pharetra id finibus nisl. Cras dictum sapien sed orci egestas, non tempus mi dapibus. Nam faucibus urna neque, et lacinia tortor finibus vitae. Donec auctor cursus justo.

                Integer sit amet augue vulputate, feugiat quam eu, tristique mi. Aenean convallis mattis elit vitae venenatis. Fusce id ultricies mauris, vel blandit lorem. Etiam vitae malesuada erat, a lacinia velit. In sit amet ornare tellus. Fusce non dolor augue. Nulla et suscipit arcu, vel porttitor mi. Donec maximus accumsan purus mattis sollicitudin. Morbi lobortis lobortis risus in mattis. Proin volutpat convallis arcu, ac ultricies nisi ultricies eu. Fusce tincidunt arcu vitae massa euismod, et placerat orci pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam eget varius lectus.

                Mauris vel malesuada lacus, in hendrerit nulla. Nam ut libero a nunc condimentum vehicula. Nulla rhoncus dolor leo, quis bibendum eros commodo in. Nam lectus lacus, malesuada sit amet gravida quis, tempus at ipsum. Vivamus a sem et purus finibus porttitor. Ut at mattis elit, sed convallis sem. Nulla bibendum sapien sed faucibus malesuada. Pellentesque porttitor ullamcorper ullamcorper. Donec euismod vulputate sapien, at hendrerit eros convallis eu. Praesent imperdiet tincidunt ligula, vel blandit elit vulputate vitae. Morbi at accumsan quam. Nam elementum eleifend ligula, sed ultricies arcu varius eu. Nulla ut ipsum lobortis, congue sem ut, gravida dui. Etiam sit amet maximus nunc, at bibendum lectus.

                Donec eleifend ultrices velit sed pharetra. Vestibulum ex augue, egestas at rhoncus nec, consectetur tincidunt sem. Fusce ac tellus eget orci facilisis aliquam. Fusce at neque ante. Integer fermentum elit eget elit tempus, nec congue diam rhoncus. Nullam vulputate lacus ac ornare bibendum. Etiam faucibus libero vel sem scelerisque lacinia.

                Nam venenatis libero massa, in efficitur tellus fermentum vitae. Aenean egestas mattis mauris, a elementum arcu finibus vitae. Donec blandit ipsum dictum nibh volutpat, et ultrices risus malesuada. Nullam ultricies ex at sagittis rhoncus. Nam molestie vulputate odio, quis lacinia nunc cursus non. Pellentesque dapibus, nibh non laoreet pulvinar, ipsum ante malesuada nisi, sit amet condimentum erat dolor quis sapien. Donec sit amet hendrerit tortor. Phasellus tincidunt, lorem fermentum vehicula elementum, orci libero sollicitudin quam, quis mattis ex justo non augue. Nullam pulvinar efficitur erat, quis egestas justo dignissim a.

                Donec ac velit sed ligula rhoncus fermentum mollis ac lacus. Morbi sem quam, vehicula sit amet risus id, sollicitudin feugiat nibh. Proin eu fermentum enim. Suspendisse in orci ante. Aenean et tempor ante. Curabitur facilisis ligula justo, ut consectetur velit scelerisque rutrum. Vivamus fringilla, sapien vitae sodales tincidunt, tellus orci pretium est, ut tempor justo nisl ac augue. Mauris semper velit sem, sed tempus velit tristique eu. Proin blandit libero ut tempus convallis. Suspendisse lacus ex, porttitor sit amet turpis ut, elementum porta augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean faucibus tempor sollicitudin. Proin nulla risus, pellentesque sed pulvinar sit amet, molestie nec leo. Ut suscipit purus sed lorem mollis pharetra. Nulla quis diam convallis, eleifend massa nec, lacinia odio.

                Maecenas faucibus sit amet est blandit malesuada. Morbi ut facilisis odio, eu gravida quam. Maecenas aliquet bibendum augue, sed porttitor massa malesuada ut. Vivamus aliquam augue ac ipsum porta rhoncus. Sed accumsan quam tellus, vitae venenatis massa rutrum eu. Etiam auctor ipsum sit amet ipsum interdum lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget semper sem. Proin pulvinar dictum leo vitae tincidunt. Quisque mauris dolor, tristique in faucibus ut, dictum eu nibh. In sagittis, dolor vulputate bibendum vestibulum, est nisl imperdiet turpis, ut tempor odio neque quis ipsum. Vestibulum cursus et erat nec porttitor. Nullam quis est et lectus auctor ornare at in purus. Nunc non fermentum tortor.
            </section>
        </div>
    );
};

/**
 * Component demonstrating different slide directions
 */
const DirectionExample: React.FC<{ direction: 'left' | 'right' | 'fade' | 'scale' }> = ({ direction }) => {
    return (
        <ScrollInOut direction={direction} >
            <div className={`direction-card direction-${direction}`}>
                <h3>Slide {direction}</h3>
                <p>Animates from {direction}</p>
            </div>
        </ScrollInOut>
    );
};

export default AnimationExamples;
