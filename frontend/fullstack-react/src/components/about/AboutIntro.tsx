import type { FunctionComponent } from "react";

interface AboutIntroProps {}

const AboutIntro: FunctionComponent<AboutIntroProps> = () => {
  return (
    <section className="mb-4">
      <h2 className="h3 border-bottom pb-2 mb-3">What is Club Manager?</h2>
      <p className="lead">
        Club Manager is a comprehensive platform designed to help users
        discover, explore, and manage clubs. Whether you're looking to join a
        new club or manage your existing memberships, our platform provides all
        the tools you need.
      </p>
      <p>
        From sports clubs to social organizations, Club Manager serves as your
        central hub for all club-related activities. Browse through our
        extensive collection, save your favorites, and stay connected with the
        clubs that matter to you.
      </p>
    </section>
  );
};

export default AboutIntro;
