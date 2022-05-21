import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import { ReactComponent as InstagramIcon } from "images/instagram-icon.svg";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as LinkdInIcon } from "images/linkdin-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import TeamIllustrationSrc from "images/team-illustration-2.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";

const LogoContainer = tw.div`flex items-center justify-center lg:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black`;

const CompanyAddress = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto lg:mx-0 lg:mr-4 leading-loose text-center lg:text-left`;

const SocialLinksContainer = tw.div`mt-4 text-center lg:text-left`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const Container = tw.div`relative m-8`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-4 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-1/4 flex-shrink-0 relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-3/4 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.img((props) => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Text = tw.div`w-full text-center`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = styled(PrimaryButtonBase)((props) => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`,
]);

export default ({
  subheading = "Our Expertise",
  heading = (
    <>
      Designed & Developed by <span tw="text-primary-500">Professionals.</span>
    </>
  ),
  // description = "CapiBull is a one-stop pro-bono solution to all your hesitations relating to personal finance. We provide the basic personal financial advisory you need to embark on your financial freedom.",
  description = "An enthusiastic coder? Here is the club for you. It is a club dedicated to programming-related activities. It keeps you updated with all the programming-related activities and competitions. It also organizes several competitions and workshops to increase coding skills. The Association for Computing and Machinery(ACM) Chapter at IIT Mandi organizes various guest lectures and tutorials from time to time.  ",
  // primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
  imageSrc = TeamIllustrationSrc,
  buttonRounded = true,
  imageRounded = true,
  imageBorder = false,
  imageShadow = false,
  imageCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    // <AnimationRevealPage dir="right">
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image
            css={imageCss}
            src={imageSrc}
            imageBorder={imageBorder}
            imageShadow={imageShadow}
            imageRounded={imageRounded}
          />
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
          {/* <Text> Aryan Jain - Founder {"&"} CEO</Text> */}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            {/* <PrimaryButton
                buttonRounded={buttonRounded}
                as="a"
                href={primaryButtonUrl}
              >
                {primaryButtonText}
              </PrimaryButton> */}
            <SocialLinksContainer>
              {/* <SocialLink href="https://www.facebook.com/aryan.jain.923" target={"_blank"}>
                <FacebookIcon />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/aryan-jain-445530194"
                target={"_blank"}
              >
                <LinkdInIcon />
              </SocialLink> */}
              {/* <SocialLink href="https://twitter.com" target={"_blank"}>
                <TwitterIcon />
              </SocialLink> */}
              {/* <SocialLink
                href="https://instagram.com/aryanjain.wav?utm_medium=copy_link"
                target={"_blank"}
              >
                <InstagramIcon />
              </SocialLink> */}
            </SocialLinksContainer>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
    // </AnimationRevealPage>
  );
};
