<script lang="ts">
	export let status: number;
	export let error: App.Error;

	const hints: Record<number, { title: string; summary: string; action: string }> = {
		404: {
			title: 'Page not found',
			summary: 'The page you are looking for may have moved or no longer exists.',
			action: 'Back to home'
		},
		401: {
			title: 'Sign-in required',
			summary: 'Please sign in to continue in Atlas Journal.',
			action: 'Go to sign-in'
		},
		403: {
			title: 'Access denied',
			summary: 'Your account does not have permission to view this page.',
			action: 'Review access'
		},
		500: {
			title: 'Server error',
			summary: 'Something went wrong on our side. Please try again shortly.',
			action: 'Reload page'
		}
	};

	const fallback = {
		title: 'Unexpected error',
		summary: 'Please try again or return to the home page.',
		action: 'Go to homepage'
	};

	$: message = hints[status] ?? fallback;
</script>

<main class="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl sm:h-80 sm:w-80"
		></div>
		<div
			class="absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl sm:h-96 sm:w-96"
		></div>
		<div
			class="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-slate-700/20 blur-3xl"
		></div>
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]"></div>
	</div>

	<section class="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-8">
		<div class="grid w-full gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Atlas Journal</p>
				<div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200">
					<span class="h-1.5 w-1.5 rounded-full bg-cyan-300"></span>
					Error
				</div>
				<div class="space-y-3">
					<div class="text-6xl font-semibold leading-none text-white sm:text-7xl">{status}</div>
					<h1 class="text-3xl font-semibold leading-tight text-white sm:text-4xl">
						{message.title}
					</h1>
				</div>
				<p class="max-w-xl text-sm leading-relaxed text-slate-300">
					{message.summary}
				</p>
				<div class="flex flex-wrap items-center gap-4">
					<a
						href={status === 401 ? '/sign-in' : '/'}
						class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
					>
						{message.action}
					</a>
					<button
						on:click={() => location.reload()}
						class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
					>
						Reload
					</button>
				</div>
			</div>

			<div class="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
				<div class="space-y-6">
					<div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
						<span>Incident details</span>
						<span class="text-cyan-300">{status}</span>
					</div>
					<div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
						<p class="text-sm font-semibold text-white">{error?.message ?? 'Unknown error'}</p>
						<p class="mt-2 text-xs text-slate-400">
							If this keeps happening, share the status code with the team.
						</p>
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
							<p class="text-xs uppercase tracking-[0.2em] text-slate-400">Suggested</p>
							<p class="mt-2 text-sm font-semibold text-white">Check the URL</p>
							<p class="mt-1 text-xs text-slate-400">Confirm the workspace slug or bookmark.</p>
						</div>
						<div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
							<p class="text-xs uppercase tracking-[0.2em] text-slate-400">Need help?</p>
							<p class="mt-2 text-sm font-semibold text-white">Contact support</p>
							<p class="mt-1 text-xs text-slate-400">We can help restore access.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
