import { render, screen } from '@testing-library/react';

import { SurveyDonutCard } from '@/app/work/shared/SurveyDonutCard';

const baseProps = {
  heading: 'Answer the following:',
  question: 'How would you describe your overall experience?',
  responses: [
    { label: 'really positive', value: 81 },
    { label: 'positive', value: 19 },
  ],
};

describe('SurveyDonutCard', () => {
  it('renders the heading, question, and calculated response labels', () => {
    render(<SurveyDonutCard {...baseProps} />);

    expect(screen.getByText(baseProps.heading)).toBeInTheDocument();
    expect(screen.getByText(baseProps.question)).toBeInTheDocument();
    expect(screen.getAllByText('81% really positive').length).toBeGreaterThan(0);
    expect(screen.getAllByText('19% positive').length).toBeGreaterThan(0);
  });

  it('announces the chart for assistive technologies', () => {
    render(<SurveyDonutCard {...baseProps} />);

    expect(
      screen.getByRole('img', {
        name: `${baseProps.heading} – ${baseProps.question}`,
      })
    ).toBeInTheDocument();
  });

  it('limits rendering to three responses', () => {
    const overflowingResponses = [
      { label: 'first', value: 40 },
      { label: 'second', value: 30 },
      { label: 'third', value: 20 },
      { label: 'fourth', value: 10 },
    ];

    expect(() =>
      render(
        <SurveyDonutCard
          heading="Overflowing example"
          question="What happens with extra responses?"
          responses={overflowingResponses}
        />
      )
    ).toThrow('SurveyDonutCard supports up to three responses.');
  });

  it('formats fractional percentages when needed', () => {
    render(
      <SurveyDonutCard
        heading="Rounded example"
        question="How balanced is this?"
        responses={[
          { label: 'option a', value: 1 },
          { label: 'option b', value: 1 },
          { label: 'option c', value: 1 },
        ]}
      />
    );

    expect(screen.getAllByText(/33\.3%/).length).toBeGreaterThanOrEqual(3);
  });
});
