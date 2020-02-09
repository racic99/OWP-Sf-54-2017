package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.KorisnikDAO;
import baza.ProjekcijaDAO;
import baza.SalaDAO;
import baza.TipProjekcijeDAO;
import model.Film;
import model.Korisnik;
import model.Projekcija;
import model.Sala;
import model.TipProjekcije;

public class ProjekcijaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.getPrijavljen(prijavljenKorisnikKorime);
		if (prijavljenKorisnik == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}

		String idProjekcije = request.getParameter("idProjekcije");
		
		Projekcija projekcija = ProjekcijaDAO.get(idProjekcije);
		
		List<Film> filmovi = FilmDAO.getSve();
		
		List<TipProjekcije> tipoviProjekcije = TipProjekcijeDAO.getAll();
		
		List<Sala> sale = SalaDAO.getAll();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("projekcija", projekcija);
		data.put("ulogaPrijavljenogKorisnika", prijavljenKorisnik.getUloga());
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		data.put("filmovi", filmovi);
		data.put("tipoviProjekcije", tipoviProjekcije);
		data.put("sale", sale);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}

}
