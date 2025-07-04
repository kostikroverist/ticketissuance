import type { SearchIdApiResponse, TicketsApiResponse } from '@/interfaces/tickets';
import { takeLatest, call, put, select, delay, type Effect } from 'redux-saga/effects';
import { fetchSearchIdFailure, fetchSearchIdStart, fetchSearchIdSuccess, fetchTicketsFailure, fetchTicketsStart, fetchTicketsSuccess } from './ticketsSlice';
import type { RootState } from '@/app/store';

const BASE_API_URL = 'http://localhost:4000';

async function getSearchIdApi(): Promise<SearchIdApiResponse> {
    const response = await fetch(`${BASE_API_URL}/search`);
    if (!response.ok) {
        throw new Error(`Помилка отримання searchId: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

async function getTicketsApi(searchId: string): Promise<TicketsApiResponse> {
    const response = await fetch(`${BASE_API_URL}/tickets?searchId=${searchId}`);
    if (!response.ok) {
        if (response.status === 500) {
            throw new Error('SERVER_ERROR_RETRY');
        }
        throw new Error(`Помилка завантаження квитків: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

function* fetchSearchIdWorker(): Generator<Effect, void, SearchIdApiResponse> {
    try {
        const { searchId } = yield call(getSearchIdApi);
        yield put(fetchSearchIdSuccess(searchId));
        yield put(fetchTicketsStart());
    } catch (error: unknown) {
        let errorMessage = 'Невідома помилка при отриманні searchId';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        yield put(fetchSearchIdFailure(errorMessage));
    }
}


function* fetchTicketsWorker(): Generator<Effect, void, unknown> {
    let stop = false;
    let retries = 0;
    const MAX_RETRIES = 5;

    while (!stop) {
        try {
            const searchId: string | null = (yield select((state: RootState) => state.tickets.searchId)) as string | null;

            if (!searchId) {
                console.warn('Search ID is missing, cannot fetch tickets.');
                yield put(fetchTicketsFailure('Search ID відсутній. Перезавантажте сторінку.'));
                stop = true;
                return;
            }

            const response: TicketsApiResponse = (yield call(getTicketsApi, searchId)) as TicketsApiResponse;

            yield put(fetchTicketsSuccess({ tickets: response.tickets, stop: response.stop }));

            stop = response.stop;
            retries = 0; 

        } catch (error: unknown) {
            let errorMessage = 'Помилка завантаження квитків';
            if (error instanceof Error) {
                errorMessage = error.message;
            }

            if (errorMessage === 'SERVER_ERROR_RETRY' && retries < MAX_RETRIES) {
                retries++;
                console.warn(`Retry ${retries}/${MAX_RETRIES} for tickets:`, errorMessage);
                yield delay(500 * retries);
            } else {
                console.error("Failed to fetch tickets, stopping.", errorMessage);
                yield put(fetchTicketsFailure(errorMessage));
                stop = true;
            }
        }
    }
}

export function* ticketsSaga() {
    yield takeLatest(fetchSearchIdStart.type, fetchSearchIdWorker);
    yield takeLatest(fetchTicketsStart.type, fetchTicketsWorker);
}