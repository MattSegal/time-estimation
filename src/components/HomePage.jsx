import styled from '@emotion/styled';
import HeroCanvas from './HeroCanvas';

const HomePage = () => {
  return (
    <Container>
      <HeroSection>
        <CanvasWrapper>
          <HeroCanvas />
        </CanvasWrapper>
          <HeroContent>
            <MainTitle>The Tiny Dry Dock</MainTitle>
            <MainSubtitle>Model Marine Repairs</MainSubtitle>
          </HeroContent>
      </HeroSection>

      <ContentSection>
        <div>
          <SectionTitle>About Me</SectionTitle>
          <Text>
            If you are anything like me, you are probably fascinated by old wooden boats. You
            probably built plastic Revell and Airfix boats in your youth. In my case, I never grew out of
            the passion for model boats but now focus my attention on building and repairing some
            large and not so large wooden vessels. Over the years, I have constructed quite an array,
            ranging from a Sicilian Barge to the Cutty Sark and everything in between... Marseille,
            Valiant, Blue Nose, Mercury, Endurance, Britannia, Alabama, America and currently HMS
            Diana, to name a few.
          </Text>
        </div>
        <ImageContainer imageSrc="/ships/content-1.jpg" />
      </ContentSection>


      <ModelBoatRepairsSection>
        <ImageContainer imageSrc="/ships/content-2.jpg" />
        <div>
          <SectionTitle>Model Boat Repairs</SectionTitle>
          <Text>
            I understand that some people have model boats built by a father, grandfather, and in
            some cases great-grandfather, which over the years have fallen into disrepair. Masts and
            spars have snapped, rigging has detached, and sails have been damaged. For many, repairing the
            model that holds great sentimental value involves skills and equipment most of us don't
            have. Fortunately, I have the skills, the materials, the patience, and the time to undertake
            such repairs.
          </Text>
        </div>
      </ModelBoatRepairsSection>

      <ContentSection>
        <div>
          <SectionTitle>What's Possible</SectionTitle>
          <Text>
            Regrettably, not all models can be salvaged because, unfortunately, they have reached a such a 
            state of disrepair that it is not financially viable to repair them... but that said, I am happy to look at your
            model and give you an idea as to what is feasible. The difficult is always an enjoyable
            challenge, but I don't take on the impossible and will let you know that from the outset.
            From a practical standpoint, I generally repair models in the Melbourne and Metropolitan
            area and Mornington Peninsula because, unfortunately, delicate wooden models don't travel
            well.

            However, I am happy to assist if I can. In some cases, I like to inspect the model,
            but generally a quality video or photos will be sufficient. If you are simply curious, get in
            contact.
          </Text>
        </div>
        <ImageContainer imageSrc="/ships/content-3.jpg" />
      </ContentSection>


      <Section>
        <SectionTitle>Get in Touch</SectionTitle>
        <Text>
          Send me an email at <strong>tinydrydock@gmail.com</strong> with your boat repair needs and your contact details.
          The hobby is a passion, and I am passionate about model boats.
        </Text>
        <Text>
          - Chris
        </Text>
      </Section>

      <Section>
        <SectionTitle>Featured Works</SectionTitle>
        <GalleryGrid>
          {GRID_IMAGES.map((image, index) => (
            <GalleryItem 
              key={index} 
              src={`/gallery/${image}`} 
              alt="Model ship"
            />
          ))}
        </GalleryGrid>
      </Section>



    </Container>
  );
};

export default HomePage;

const GRID_IMAGES = [
  "IMG_0659.jpg",
  "IMG_8086.jpg",
  "IMG_7441.jpg",
  "IMG_8087.jpg",
  "IMG_2180.jpg",
  "IMG_2184.jpg",
  "IMG_2252.jpg", 
  "IMG_5430.jpg",
  "IMG_5676.jpg",
  "IMG_6602.jpg",
  "IMG_6852.jpg",
  "IMG_6906.jpg",
  "IMG_7179.jpg",
  "IMG_7220.jpg",
  "IMG_2185.jpg",
  "IMG_7501.jpg",
  "IMG_2183.jpg",
  "IMG_2405.jpg",
  "IMG_5435.jpg",
  "IMG_7402.JPG",
  "IMG_7144.jpg",
  "IMG_7195.jpg",
  "IMG_6601.jpg",
  "IMG_6603.jpg",
]


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  
  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  margin-bottom: 4rem;
  overflow: hidden;
  background-color: var(--parchment-dark);
  
  @media (max-width: 768px) {
    height: 60vh;
    margin-left: -2rem;
    margin-right: -2rem;
    margin-bottom: 2rem;
  }
`;

const CanvasWrapper = styled.div`
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  color: var(--navy-dark);
  margin-bottom: 1rem;
  font-family: 'IM Fell English', serif;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const MainSubtitle = styled.h2`
  font-size: 1.8rem;
  color: var(--navy-medium);
  font-family: 'IM Fell English', serif;
  font-weight: normal;
  text-align: center;
`;

const ContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 6rem 0;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ModelBoatRepairsSection = styled(ContentSection)`
  @media (max-width: 768px) {
    > div:first-of-type {
      order: 2;
    }
    > div:last-of-type {
      order: 1;
    }
  }
`;

const ImageContainer = styled.div`
  aspect-ratio: 4/3;
  background-image: url(${props => props.imageSrc});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--parchment);
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const GalleryItem = styled.img`
  height: 345px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
  }
`;