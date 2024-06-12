'use client';

import { GameForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateGame } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditGameForm({
  game
}: {
  game: GameForm;
}) {
    const initialState = { message: null, errors: {} };
    const updateGameWithId = updateGame.bind(null, game.id);
    const [state, dispatch] = useFormState(updateGameWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Game Name */}
        <div className="mb-4">
          <label htmlFor="gameName" className="mb-2 block text-sm font-medium">
            Game Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="gameName"
                name="gameName"
                type="text"
                defaultValue={game.name}
                placeholder="Enter game name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="gameName-error"
              />
            </div>
          </div>
          <div id="gameName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Release Year */}
        <div className="mb-4">
          <label htmlFor="releaseYear" className="mb-2 block text-sm font-medium">
            Release Year
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="releaseYear"
                name="releaseYear"
                type="number"
                step="1"
                defaultValue={game.release_year}
                placeholder="Enter release year"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="releaseYear-error"
              />
            </div>
          </div>
          <div id="releaseYear-error" aria-live="polite" aria-atomic="true">
            {state.errors?.releaseYear &&
              state.errors.releaseYear.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          </div>
        </div>

        {/* Platform */}
        <div className="mb-4">
          <label htmlFor="platform" className="mb-2 block text-sm font-medium">
            Platform
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="platform"
                name="platform"
                type="text"
                defaultValue={game.platform}
                placeholder="Enter platform"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="platform-error"
              />
            </div>
          </div>
          <div id="platform-error" aria-live="polite" aria-atomic="true">
            {state.errors?.platform &&
              state.errors.platform.map((error: string) => (
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
          href="/dashboard/games"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Game</Button>
      </div>
    </form>
  );
}
