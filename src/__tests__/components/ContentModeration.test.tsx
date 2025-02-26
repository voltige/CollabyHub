import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContentModeration } from '../../components/ContentModeration';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('ContentModeration', () => {
  it('should render the moderation interface', () => {
    render(
      <Provider store={store}>
        <ContentModeration />
      </Provider>
    );
    
    expect(screen.getByText('Modération du contenu')).toBeInTheDocument();
  });

  it('should filter content by status', async () => {
    render(
      <Provider store={store}>
        <ContentModeration />
      </Provider>
    );
    
    const pendingButton = screen.getByText('En attente');
    fireEvent.click(pendingButton);
    
    await waitFor(() => {
      expect(screen.getByText('Signalements en attente')).toBeInTheDocument();
    });
  });
});