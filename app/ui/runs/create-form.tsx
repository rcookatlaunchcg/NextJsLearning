'use client';

import { GameField, PlayerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createRun } from '@/app/lib/runs/actions';
import { useFormState } from 'react-dom';

export default function Form({
  games,
  players
}: {
  games: GameField[],
  players: PlayerField[]
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createRun, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Player Name */}
        <div className="mb-4">
          <label htmlFor="player" className="mb-2 block text-sm font-medium">
            Choose player
          </label>
          <div className="relative">
            <select
              id="player"
              name="playerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="player-error"
            >
              <option value="" disabled>
                Select a player
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.user_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="player-error" aria-live="polite" aria-atomic="true">
            {state.errors?.playerId &&
              state.errors.playerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Game Name */}
        <div className="mb-4">
          <label htmlFor="game" className="mb-2 block text-sm font-medium">
            Choose game
          </label>
          <div className="relative">
            <select
              id="game"
              name="gameId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="game-error"
            >
              <option value="" disabled>
                Select a game
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="player-error" aria-live="polite" aria-atomic="true">
            {state.errors?.playerId &&
              state.errors.playerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="duration" className="mb-2 block text-sm font-medium">
            Run Duration
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="duration"
                name="duration"
                type="text"
                placeholder="Enter run duration"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="duration-error"
              />
            </div>
          </div>
          <div id="duration-error" aria-live="polite" aria-atomic="true">
            {state.errors?.duration &&
              state.errors.duration.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Video Link */}
        <div className="mb-4">
          <label htmlFor="link" className="mb-2 block text-sm font-medium">
            Video Link
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="link"
                name="link"
                type="text"
                placeholder="Enter link to run video"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="link-error"
              />
            </div>
          </div>
          <div id="link-error" aria-live="polite" aria-atomic="true">
            {state.errors?.link &&
              state.errors.link.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Run Date */}
        <div className="mb-4">
          <label htmlFor="runDate" className="mb-2 block text-sm font-medium">
            Run Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="runDate"
                name="runDate"
                type="text"
                placeholder="Enter run date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="runDate-error"
              />
            </div>
          </div>
          <div id="runDate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.runDate &&
              state.errors.runDate.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {state.message ? (
              <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            ): ''}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/runs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Run</Button>
      </div>
    </form>
  );
}
